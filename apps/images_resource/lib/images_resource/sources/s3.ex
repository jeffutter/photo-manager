defmodule ImagesResource.Sources.S3 do
  require Logger
  use GenServer

  alias ImagesResource.{Gallery}
  alias ImagesResource.Storage.S3

  @type t :: %{bucket_name: String.t, tree: Gallery.t, name: atom()}
  defstruct bucket_name: "", tree: nil, name: nil

  def start_link(bucket_name, name) do
    GenServer.start_link(__MODULE__, %__MODULE__{bucket_name: bucket_name, name: name}, name: name)
  end

  def init(state) do
    case refresh(state) do
      {:ok, state} ->
        auto_refresh()
        {:ok, state}
      {:error, e} ->
        Logger.error "Error refreshing #{__MODULE__} at start: #{inspect e}"
        auto_refresh()
        {:ok, state}
    end
  end

  def handle_info(:auto_refresh, state) do
    case refresh(state) do
      {:ok, state} ->
        auto_refresh()
        {:noreply, state}
      {:error, e} ->
        Logger.error "Error auto-refreshing #{__MODULE__}: #{inspect e}"
        auto_refresh()
        {:noreply, state}
    end
  end

  defp auto_refresh do
    Process.send_after(self(), :auto_refresh, 60 * 1000)
  end

  def handle_cast(:refresh, state) do
    case refresh(state) do
      {:ok, state} ->
        {:noreply, state}
      {:error, e} ->
        Logger.error "Error refreshing #{__MODULE__}: #{inspect e}"
        {:noreply, state}
    end
  end

  defp refresh(state = %__MODULE__{bucket_name: bucket_name, name: name}) do
    Logger.info "Refreshing #{inspect bucket_name} for #{inspect name}"

    path = if bucket_name == Config.get(:images_resource, :dest_bucket) do
             "/original"
           else
             nil
           end

    strip_prefix = if bucket_name == Config.get(:images_resource, :dest_bucket) do
                     ["original"]
                   else
                     []
                   end

    case S3.ls_tree(path, bucket: bucket_name, strip_prefix: strip_prefix) do
      {:ok, tree} ->
        state = %__MODULE__{state | tree: tree}

        GenServer.cast(ImagesResource.Sync, {:updated, name, tree})
        Logger.info "Refresh complete for #{inspect bucket_name} for #{inspect name}"

        {:ok, state}
      {:error, e} -> {:error, e}
    end
  end

  def handle_call(:state, _from, state) do
    {:reply, state, state}
  end
  def handle_call(:tree, _from, state) do
    {:reply, state.tree, state}
  end
  def tree(name) do
    GenServer.call(name, :tree)
  end
end
