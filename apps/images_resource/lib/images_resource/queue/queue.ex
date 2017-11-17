defmodule ImagesResource.Queue.Queue do
  require Logger

  use GenStage

  alias ImagesResource.Queue.Job

  defstruct name: "", q: nil, in_progress: nil, pending_demand: 0, max_retries: 5, reply: false

  def start_link(name, options \\ []) do
    GenStage.start_link(__MODULE__, {name, options}, name: name)
  end

  def init({name, options}) do
    max_retries = Keyword.get(options, :max_retries, 5)
    reply = Keyword.get(options, :reply, false)

    {
      :producer,
      %__MODULE__{
        name: name,
        q: :queue.new(),
        in_progress: Map.new(),
        max_retries: max_retries,
        reply: reply
      }
    }
  end

  def handle_demand(incoming_demand, queue = %__MODULE__{pending_demand: pending_demand}) do
    dispatch_jobs(%__MODULE__{queue | pending_demand: incoming_demand + pending_demand}, [])
  end

  defp dispatch_jobs(
         queue = %__MODULE__{
           name: name,
           q: q,
           pending_demand: pending_demand,
           in_progress: in_progress
         },
         jobs
       ) do
    if pending_demand > 0 do
      case :queue.out(q) do
        {{:value, job}, q} ->
          dispatch_jobs(
            %__MODULE__{
              queue
              | q: q,
                pending_demand: pending_demand - 1,
                in_progress: Map.put(in_progress, job.id, job)
            },
            [job | jobs]
          )

        {:empty, q} ->
          Logger.debug("#{inspect(name)} Queue Empty")
          {:noreply, Enum.reverse(jobs), %__MODULE__{queue | q: q}}
      end
    else
      {:noreply, Enum.reverse(jobs), queue}
    end
  end

  def handle_cast({:push, event, from}, queue = %__MODULE__{q: q, name: name}) do
    job = Job.new(event, name, from)

    if exists?(queue, job) do
      dispatch_jobs(queue, [])
    else
      updated_queue = :queue.in(job, q)
      dispatch_jobs(%__MODULE__{queue | q: updated_queue}, [])
    end
  end

  def handle_cast({:ack, %Job{id: id}}, queue = %__MODULE__{in_progress: in_progress}) do
    dispatch_jobs(%__MODULE__{queue | in_progress: Map.delete(in_progress, id)}, [])
  end

  def handle_cast({:ack, job = %Job{from: from}, reply}, queue = %__MODULE__{reply: send_reply}) do
    if send_reply do
      Process.send(from, reply, [])
    end

    handle_cast({:ack, job}, queue)
  end

  def handle_cast(
        {:nack, job = %Job{id: id, retry_count: retry_count}},
        queue = %__MODULE__{name: name, q: q, in_progress: in_progress, max_retries: max_retries}
      ) do
    if retry_count < max_retries do
      dispatch_jobs(
        %__MODULE__{
          queue
          | q: :queue.in(%Job{job | retry_count: retry_count + 1}, q),
            in_progress: Map.delete(in_progress, id)
        },
        []
      )
    else
      Logger.error(
        "#{inspect(name)} Queue failed to re-queue job, retry(#{retry_count}/#{max_retries}): #{
          inspect(job)
        }"
      )

      dispatch_jobs(%__MODULE__{queue | in_progress: Map.delete(in_progress, id)}, [])
    end
  end

  def handle_call(:state, _from, queue) do
    {:reply, queue, [], queue}
  end

  defp exists?(%__MODULE__{q: q, in_progress: in_progress}, %Job{event: event}) do
    compare = fn
      %Job{event: ^event} -> true
      _ -> false
    end

    Enum.any?(:queue.to_list(q), compare) || Enum.any?(Map.values(in_progress), compare)
  end

  def add(queue_name, event) do
    GenStage.cast(queue_name, {:push, event, self()})
  end

  def ack(job = %Job{queue: queue}) do
    ack(queue, job)
  end

  def ack(queue_name, job = %Job{}) do
    GenStage.cast(queue_name, {:ack, job})
  end

  def ack(job = %Job{queue: queue}, reply) do
    ack(queue, job, reply)
  end

  def ack(queue_name, job = %Job{}, reply) do
    GenStage.cast(queue_name, {:ack, job, reply})
  end

  def nack(job = %Job{queue: queue}) do
    nack(queue, job)
  end

  def nack(queue_name, job) do
    GenStage.cast(queue_name, {:nack, job})
  end

  def state(queue_name) do
    GenStage.call(queue_name, :state)
  end
end
