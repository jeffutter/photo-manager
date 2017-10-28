defmodule ImagesResource.SyncDB do
  require Logger
  use GenServer

  alias ImagesResource.Storage.{Directory, File, Tree}
  alias ImagesResource.Image
  alias ImagesResource.DBQueue.Queue, as: DBQueue
  import Ecto.Query

  @type t :: %{source: atom(), dest: atom(), source_tree: Directory.t, dest_tree: Directory.t }
  defstruct source: nil, dest: nil, source_tree: nil, dest_tree: nil

  def start_link(source: source, dest: dest, name: name) do
    GenServer.start_link(__MODULE__, %__MODULE__{source: source, dest: dest}, name: name)
  end

  def handle_cast({:updated, from_name, tree}, state = %{source: source_name, dest_tree: dest_tree}) when from_name == source_name do
    tree
    |> Tree.diff(dest_tree)
    |> Enum.each(&DBQueue.add(&1, :thumb))

    {:noreply, %{state | source_tree: tree}}
  end

  def handle_cast({:updated, from_name, tree}, state = %{dest: dest_name}) when from_name == dest_name do
    {:noreply, %{state | dest_tree: tree}}
  end

  def add(file = %File{name: name, size: size, last_modified: last_modified, path: path, slug: slug}, version) do
    with {:ok, %{height: height, width: width}} <- Image.size(file, :large),
         {:ok, base64} <- Image.base_64(file, version) do
      params = %{
          name: name,
          size: size,
          last_modified: last_modified,
          path: path,
          slug: slug,
          height: height,
          width: width,
          base64: base64,
          version: version
      }

      %PhotoManagementApi.Image{}
      |> PhotoManagementApi.Image.changeset(params)
      |> PhotoManagementApi.Repo.insert
    else
      _ -> {:error, :internet_error}
    end
  end

  def remove(file = %File{name: name, path: path, slug: slug}, version) do
    query = from i in PhotoManagementApi.Image,
            where: i.name == ^name,
            where: i.path == ^path,
            where: i.slug == ^slug,
            where: i.version == ^version

    PhotoManagementApi.Repo.delete_all(query)
  end
end