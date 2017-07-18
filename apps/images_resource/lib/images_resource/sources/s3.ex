defmodule ImagesResource.Sources.S3 do
  use GenServer

  alias ImagesResource.{Gallery, Image}
  alias ImagesResource.Storage.S3

  @type t :: %{bucket_name: String.t, galleries: [Gallery.t], images: [Image.t]}
  defstruct bucket_name: "", galleries: [], images: []

  def start_link(bucket_name, name) do
    GenServer.start_link(__MODULE__, %__MODULE__{bucket_name: bucket_name}, name: name)
  end

  def init(state) do
    state = refresh(state)
    auto_refresh()
    {:ok, state}
  end

  def handle_info(:auto_refresh, state) do
    state = refresh(state)
    auto_refresh()
    {:noreply, state}
  end

  defp auto_refresh do
    Process.send_after(self(), :auto_refresh, 60 * 1000)
  end

  def handle_cast(:refresh, state) do
    state = refresh(state)
    {:noreply, state}
  end

  defp refresh(state = %__MODULE__{bucket_name: bucket_name}) do
    galleries = S3.ls_directories("/", bucket: bucket_name)
    |> Enum.map(&Gallery.to_struct/1)

    images = S3.ls("/", bucket: bucket_name)
    |> Enum.map(fn path ->
      galleries
      |> Enum.find(fn gallery -> Path.dirname(path) == gallery.name end)
      |> Image.to_struct(Path.basename(path))
    end)

    state
    |> Map.put(:galleries, galleries)
    |> Map.put(:images, images)
  end

  def handle_call(:state, _from, state) do
    {:reply, state, state}
  end
  def handle_call(:images, _from, state) do
    {:reply, state.images, state}
  end
  def images(name) do
    GenServer.call(name, :images)
  end
end
