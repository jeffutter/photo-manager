defmodule ImagesResource.Queue do
  require Logger

  use GenStage

  alias ImagesResource.Job

  defstruct name: "", q: nil, in_progress: nil, pending_demand: 0

  def start_link(name) do
    GenStage.start_link(__MODULE__, name, name: name)
  end

  def init(name) do
    {:producer, %__MODULE__{name: name, q: :queue.new(), in_progress: Map.new()}}
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
          Logger.debug("Image #{inspect(name)} Queue Empty")
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

  def handle_cast(
        {:nack, job = %Job{id: id}},
        queue = %__MODULE__{q: q, in_progress: in_progress}
      ) do
    dispatch_jobs(
      %__MODULE__{queue | q: :queue.in(job, q), in_progress: Map.delete(in_progress, id)},
      []
    )
  end

  def handle_call(:state, _from, queue) do
    {:reply, queue, [], queue}
  end

  defp exists?(%__MODULE__{q: q, in_progress: in_progress}, %Job{event: event}) do
    compare = fn
      %Job{event: ^event} -> true
      _ -> false
    end

    Enum.any?(:queue.to_list(q), compare) || Enum.any?(Map.keys(in_progress), compare)
  end

  def add(queue_name, event) do
    GenStage.cast(queue_name, {:push, event, self()})
  end

  def ack(queue_name, job) do
    GenStage.cast(queue_name, {:ack, job})
  end

  def nack(queue_name, job) do
    GenStage.cast(queue_name, {:nack, job})
  end

  def state(queue_name) do
    GenStage.call(queue_name, :state)
  end
end
