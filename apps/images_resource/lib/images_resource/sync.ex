defmodule ImagesResource.Sync do
  require Logger
  use GenServer

  alias ImagesResource.Storage.{Directory, File, Tree}
  alias ImagesResource.Uploaders.Queue, as: ImageQueue
  alias ImagesResource.Sizer.Queue, as: SizeQueue

  @type t :: %{source: atom(), dest: atom(), source_tree: Directory.t, dest_tree: Directory.t }
  defstruct source: nil, dest: nil, source_tree: nil, dest_tree: nil

  def start_link(source: source, dest: dest) do
    GenServer.start_link(__MODULE__, %__MODULE__{source: source, dest: dest}, name: __MODULE__)
  end

  def handle_cast({:updated, from_name, tree}, state = %{source: source_name, dest_tree: dest_tree}) when from_name == source_name do
    tree
    |> Tree.diff(dest_tree)
    |> Enum.each(&ImageQueue.add/1)

    tree
    |> Directory.flat_children
    |> Enum.each(&warm_image_size_cache/1)

    warm_image_size_cache(tree)

    {:noreply, %{state | source_tree: tree}}
  end

  def handle_cast({:updated, from_name, tree}, state = %{dest: dest_name}) when from_name == dest_name do
    {:noreply, %{state | dest_tree: tree}}
  end

  defp warm_image_size_cache(file = %File{}), do: SizeQueue.add(file, :original)
  defp warm_image_size_cache(_), do: :noop

end
