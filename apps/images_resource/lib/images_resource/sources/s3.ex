defmodule ImagesResource.Sources.S3 do
  require Logger
  use GenServer

  alias ImagesResource.{Gallery, Image}
  alias ImagesResource.Storage.S3

  @type t :: %{bucket_name: String.t, galleries: [Gallery.t], images: [Image.t], name: atom()}
  defstruct bucket_name: "", galleries: [], images: [], name: nil

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

  defp to_image_struct(image_data, galleries) do
    galleries
    |> Enum.find(fn gallery -> Path.dirname(image_data.name) == gallery.name end)
    |> Image.to_struct(image_data)
  end

  defp refresh(state = %__MODULE__{bucket_name: bucket_name, name: name}) do
    Logger.info "Refreshing #{inspect bucket_name} for #{inspect name}"
    with {:ok, list} <- S3.ls_directories("/", bucket: bucket_name),
         galleries   <- Enum.map(list, &Gallery.to_struct/1),
         {:ok, list} <- S3.ls("/", bucket: bucket_name),
         images      <- Enum.map(list, &to_image_struct(&1, galleries)) do
      state = state
      |> Map.put(:galleries, galleries)
      |> Map.put(:images, images)

      GenServer.cast(ImagesResource.Sync, {:updated, name, state.images})
      Logger.info "Refresh complete for #{inspect bucket_name} for #{inspect name}"

      {:ok, state}
    else
      {:error, e} ->
        {:error, e}
      e ->
        {:error, "Unknown error occured: #{inspect e}"}
    end
  end

  def handle_call(:state, _from, state) do
    {:reply, state, state}
  end
  def handle_call(:images, _from, state) do
    {:reply, state.images, state}
  end
  def handle_call(:galleries, _from, state) do
    {:reply, state.galleries, state}
  end
  def images(name) do
    GenServer.call(name, :images)
  end
  def galleries(name) do
    GenServer.call(name, :images)
  end
end
