defmodule ImagesResource.Uploaders.Queue do
  require Logger

  use GenStage

  def start_link() do
    GenStage.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:producer, {:queue.new(), 0}}
  end

  def handle_demand(incoming_demand, {queue, pending_demand}) do
    dispatch_events(queue, incoming_demand + pending_demand, [])
  end

  defp dispatch_events(queue, demand, events) do
    case :queue.out(queue) do
      {{:value, event}, queue} ->
        dispatch_events(queue, demand - 1, [event | events])
      {:empty, queue} ->
        Logger.debug "Image Uploader Queue Empty"
        {:noreply, Enum.reverse(events), {queue, demand}}
    end
  end

  def handle_cast({:push, event}, {queue, pending_demand}) do
    updated_queue = :queue.in(event, queue)
    dispatch_events(updated_queue, pending_demand, [])
  end

  def add(event) do
    GenStage.cast(__MODULE__, {:push, event})
  end
end
