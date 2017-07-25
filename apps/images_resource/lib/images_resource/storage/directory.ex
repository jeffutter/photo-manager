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
    root = name
           |> new
           |> make_directories(file_list)
    from_list(file_list, root)
  end
  def from_list([], tree), do: tree
  def from_list([h | t], tree) do
    file = %ImagesResource.Storage.File{name: Path.basename(h)}
    tree = insert_in(tree, h, file)

    from_list(t, tree)
  end

  def new(name, path \\ []) do
    %__MODULE__{name: name, path: path}
  end

  @doc ~S"""
  Looks up a path in the tree

  ## Examples
      iex> ["foo/bar/baz.txt", "foo.txt"]
      ...> |> ImagesResource.Storage.Directory.from_list("root")
      ...> |> ImagesResource.Storage.Directory.find_in(["foo", "bar", "baz.txt"])
      %ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], size: nil}

      iex> ["foo/bar/baz.txt", "foo.txt"]
      ...> |> ImagesResource.Storage.Directory.from_list("root")
      ...> |> ImagesResource.Storage.Directory.find_in(["foo", "bar" ])
      %ImagesResource.Storage.Directory{children: [%ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], size: nil}], name: "bar", path: ["foo"]}
  """
  def find_in(result, []), do: result
  def find_in(tree, [h | t]) do
    case Enum.find(tree.children, fn %{name: name} -> name == h end) do
      nil -> nil
      sub_tree -> find_in(sub_tree, t)
    end
  end

  @doc ~S"""
  Insert a child in a give path

  ## Examples
  iex> new_image = %ImagesResource.Storage.File{
  ...>   name: "qux.txt",
  ...>   path: []
  ...> }
  ...> ["foo/bar/baz.txt", "foo.txt"]
  ...> |> ImagesResource.Storage.Directory.from_list("root")
  ...> |> ImagesResource.Storage.Directory.insert_in(["foo"], new_image)
  %ImagesResource.Storage.Directory{
    children: [
      %ImagesResource.Storage.Directory{
        children: [
          %ImagesResource.Storage.Directory{
            children: [
              %ImagesResource.Storage.File{
                last_modified: nil,
                name: "baz.txt",
                path: ["foo", "bar"],
                size: nil
              }
            ],
            name: "bar",
            path: ["foo"]
          },
          %ImagesResource.Storage.File{
            last_modified: nil,
            name: "qux.txt",
            path: ["foo"],
            size: nil
          }
        ],
        name: "foo",
        path: []
      },
      %ImagesResource.Storage.File{
        last_modified: nil,
        name: "foo.txt",
        path: [],
        size: nil
      }
    ],
    name: "root",
    path: []
  }

  """
  def insert_in(tree, path, value) when is_binary(path) do
    insert_in(tree, directory_parts(path), value)
  end
  def insert_in(tree = %__MODULE__{name: path_name, children: children, path: path}, [], value) do
    index = Enum.find_index(children, fn %{name: name} -> name == value.name end)

    value = case path_name do
              "root" -> Map.put(value, :path, [])
              _ -> Map.put(value, :path, path ++ [path_name])
            end

    if index do
      new_children = List.update_at(children, index, fn _ -> value end)
      %__MODULE__{tree | children: new_children}
    else
      %__MODULE__{tree | children: children ++ [value]}
    end
  end
  def insert_in(tree = %__MODULE__{children: children}, [h | t], value) do
    index = Enum.find_index(children, fn %__MODULE__{name: name} -> name == h end)

    if index do
      new_children = List.update_at(children, index, fn child -> insert_in(child, t, value) end)
      %__MODULE__{tree | children: new_children}
    else
      raise "Directory #{h} not found in tree! #{inspect tree}"
    end
  end

  defp make_directories(tree, file_list) do
    file_list
    |> Enum.map(&Path.dirname/1)
    |> Enum.uniq
    |> Kernel.--(["."])
    |> Enum.sort
    |> Enum.map(&Path.split/1)
    |> Enum.reduce(tree, fn path, tree ->
      make_directories(path, [], tree)
    end)
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
