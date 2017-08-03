defmodule ImagesResource.Sync do
  require Logger
  use GenServer

  alias ImagesResource.Storage.{S3, File, Directory, Tree}
  alias ImagesResource.Uploaders.Image

  @type t :: %{source: atom(), dest: atom(), source_tree: Directory.t, dest_tree: Directory.t }
  defstruct source: nil, dest: nil, source_tree: nil, dest_tree: nil

  def start_link(source: source, dest: dest) do
    GenServer.start_link(__MODULE__, %__MODULE__{source: source, dest: dest}, name: __MODULE__)
  end

  def handle_cast({:updated, from_name, tree}, state = %{source: source_name, dest_tree: dest_tree}) when from_name == source_name do
    tree
    |> Tree.diff(dest_tree)
    |> Enum.each(&process_sync/1)

    {:noreply, %{state | source_tree: tree}}
  end

  def handle_cast({:updated, from_name, tree}, state = %{dest: dest_name}) when from_name == dest_name do
    {:noreply, %{state | dest_tree: tree}}
  end

  defp process_sync({:add, file = %File{name: name, path: path}}) do
    Logger.info "Storing: #{inspect file}"

    with source_bucket <- Config.get(:images_resource, :source_bucket),
             full_path <- File.full_path(file),
           {:ok, data} <- S3.get_data(bucket: source_bucket),
              {:ok, _} <- Image.store({%{filename: name, binary: data}, path}) do
      :ok
    else
      {:error, e} ->
        Logger.error "Failed to upload to S3 #{inspect e}"
    end
  end

  defp process_sync({:remove, file = %File{name: name, path: path}}) do
    Logger.info "Deleting: #{inspect file}"
    Image.delete({name, path})
  end
end
