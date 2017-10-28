defmodule ImagesResource.Sources.DB do
  require Logger
  use GenServer

  alias ImagesResource.{Gallery}
  alias ImagesResource.Storage.DB

  @type t :: %{tree: Gallery.t, name: atom(), sync_target: atom()}
  defstruct tree: nil, name: nil, sync_target: nil

  def start_link(name, opts \\ []) do
    sync_target = Keyword.get(opts, :sync_target)
    GenServer.start_link(__MODULE__, %__MODULE__{name: name, sync_target: sync_target}, name: name)
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

  defp refresh(state = %__MODULE__{name: name, sync_target: sync_target}) do
    Logger.info "Refreshing DB for #{inspect name}."

    case DB.ls_tree(nil) do
      {:ok, tree} ->
        state = %__MODULE__{state | tree: tree}

        GenServer.cast(sync_target, {:updated, name, tree})
        Logger.info "Refresh complete for DB for #{inspect name}"

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
