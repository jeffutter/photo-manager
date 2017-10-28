defmodule ImagesResource.DBQueue.Queue do
  require Logger

  use GenStage

  def start_link() do
    GenStage.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:producer, {:queue.new(), 0}}
  end

  def handle_demand(incoming_demand, {queue, pending_demand}) do
    dispatch_file_versions(queue, incoming_demand + pending_demand, [])
  end

  defp dispatch_file_versions(queue, demand, file_versions) do
    case :queue.out(queue) do
      {{:value, file_version}, queue} ->
        dispatch_file_versions(queue, demand - 1, [file_version | file_versions])
      {:empty, queue} ->
        Logger.debug "DB Queue Empty"
        {:noreply, Enum.reverse(file_versions), {queue, demand}}
    end
  end

  def handle_cast({:push, file, version}, {queue, pending_demand}) do
    updated_queue = :queue.in({file, version}, queue)
    dispatch_file_versions(updated_queue, pending_demand, [])
  end

  def add(file, version) do
    GenStage.cast(__MODULE__, {:push, file, version})
  end
end
