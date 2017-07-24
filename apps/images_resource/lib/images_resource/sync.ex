defmodule ImagesResource.Sync do
  require Logger
  use GenServer

  alias ImagesResource.{Image}
  alias ImagesResource.Storage.S3

  @type t :: %{source: atom(), dest: atom(), source_images: [Image.t], dest_images: [Image.t]}
  defstruct source: nil, dest: nil, source_images: [], dest_images: []

  def start_link(source: source, dest: dest) do
    GenServer.start_link(__MODULE__, %__MODULE__{source: source, dest: dest}, name: __MODULE__)
  end

  def handle_cast({:updated, from_name, images}, state = %{source: source_name, dest_images: dest_images}) when from_name == source_name do
    images
    |> Enum.filter(&not_exists_in_dest?(&1, dest_images))
    |> Enum.each(&sync_missing/1)

    {:noreply, %{state | source_images: images}}
  end

  def handle_cast({:updated, from_name, images}, state = %{dest: dest_name}) when from_name == dest_name do
    {:noreply, %{state | dest_images: images}}
  end

  defp not_exists_in_dest?(source_image, dest_images) do
    !exists_in_dest?(source_image, dest_images)
  end
  defp exists_in_dest?(source_image, dest_images) do
    file = dest_images
           |> Enum.find(fn dest_image ->
             Image.relative_path(source_image) == Image.relative_path(dest_image)
           end)

    case file do
      nil -> false
      _ -> true
    end
  end

  defp sync_missing(image) do
    Logger.info "Storing: #{inspect image}"
    relative_path = Image.relative_path(image)
    {:ok, data} = S3.get_data(relative_path, bucket: "image-source")
    ImagesResource.Uploaders.Image.store(%{filename: relative_path, binary: data})
  end
end
