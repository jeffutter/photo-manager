defmodule ImagesResource.Storage.Directory do
  @type t :: %{name: String.t, children: list(Directory.t | File.t), path: list(String.t)}
  defstruct name: "", children: [], path: []

  @doc ~S"""
  Takes a name for the directory and a list of files and returns the file/directory tree

  ## Examples
      iex> ImagesResource.Storage.Directory.from_list([], "root")
      %ImagesResource.Storage.Directory{name: "root", children: [], path: []}

      iex> ["foo/bar/baz.txt", "foo.txt"]
      ...> |> ImagesResource.Storage.Directory.from_list("root")
      %ImagesResource.Storage.Directory{
        name: "root",
        children: [
          %ImagesResource.Storage.Directory{
            name: "foo",
            children: [
              %ImagesResource.Storage.Directory{
                name: "bar",
                children: [
                  %ImagesResource.Storage.File{
                    name: "baz.txt",
                    path: ["foo", "bar"]
                  }
                ],
                path: ["foo"]
              }
            ],
            path: []
          },
          %ImagesResource.Storage.File{
            name: "foo.txt",
            path: []
          }
        ],
        path: []}
  """
  def from_list(file_list, name) when is_binary(name) do
    from_list(file_list, new(name))
  end
  def from_list([], tree), do: tree
  def from_list([h | t], tree) do
    tree = h
    |> directory_parts
    |> make_directories([], tree)
    |> insert_in(h)

    from_list(t, tree)
  end

  def new(name, path \\ []) do
    %__MODULE__{name: name, path: path}
  end

  defp insert_in(tree, full_path) do
    insert_in(tree, directory_parts(full_path), [], Path.basename(full_path))
  end
  defp insert_in(tree, [], path, file_name) do
    file = %ImagesResource.Storage.File{name: file_name, path: path}
    %__MODULE__{tree | children: tree.children ++ [file]}
  end
  defp insert_in(tree = %__MODULE__{children: children}, [h | t], path, file_name) do
    index = Enum.find_index(children, fn %__MODULE__{name: name} -> name == h end)

    if index do
      new_children = List.update_at(children, index, fn child -> insert_in(child, t, path ++ [h], file_name) end)
      %__MODULE__{tree | children: new_children}
    else
      raise "Directory #{h} not found in tree! #{inspect tree}"
    end
  end

  defp make_directories([], _, tree), do: tree
  defp make_directories([h | t], path, tree = %__MODULE__{children: children}) do
    index = Enum.find_index(children, fn %__MODULE__{name: name} -> name == h end)

    if index do
      new_children = List.update_at(children, index, fn child -> make_directories(t, path ++ [h], child) end)
      %__MODULE__{tree | children: new_children}
    else
      new_dir = new(h, path)
      %__MODULE__{tree | children: children ++ [make_directories(t, path ++ [h], new_dir)]}
    end
  end

  defp directory_parts(file_name) do
    case Path.dirname(file_name) do
      "." -> []
      dirname -> Path.split(dirname)
    end
  end
end
