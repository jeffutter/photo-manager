defmodule ImagesResource.Storage.Tree do
  alias ImagesResource.Storage.{File, Directory}

  @doc ~S"""
  Takes a name for the directory and a list of files and returns the file/directory tree

  ## Examples
      iex> ImagesResource.Storage.Tree.from_list([], "root")
      %ImagesResource.Storage.Directory{name: "root", children: [], path: []}

      iex> [
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: []}
      ...> ]
      ...> |> ImagesResource.Storage.Tree.from_list("root")
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
  def from_list(file_list, root_name) when is_binary(root_name) do
    root = root_name
           |> Directory.new
           |> make_directories(file_list)
    from_list(file_list, root)
  end
  def from_list([], tree), do: tree
  def from_list([file = %File{} | t], tree) do
    from_list(t, insert_in(tree, file))
  end

  @doc ~S"""
  Looks up a path in the tree

  ## Examples
      iex> [
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: []}
      ...> ]
      ...> |> ImagesResource.Storage.Tree.from_list("root")
      ...> |> ImagesResource.Storage.Tree.find_in(["foo", "bar", "baz.txt"])
      %ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], size: nil}

      iex> [
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: []}
      ...> ]
      ...> |> ImagesResource.Storage.Tree.from_list("root")
      ...> |> ImagesResource.Storage.Tree.find_in(["foo", "bar" ])
      %ImagesResource.Storage.Directory{children: [%ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], size: nil}], name: "bar", path: ["foo"]}
  """
  def find_in(result, []), do: result
  def find_in(tree, [h | t]) do
    case Directory.find_child(tree, h) do
      {nil, nil} -> nil
      {_idx, child} -> find_in(child, t)
    end
  end

  @doc ~S"""
  Insert a child in a give path

  ## Examples
  iex> new_image = %ImagesResource.Storage.File{
  ...>   name: "qux.txt",
  ...>   path: []
  ...> }
  ...> [
  ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
  ...>   %ImagesResource.Storage.File{name: "foo.txt", path: []}
  ...> ]
  ...> |> ImagesResource.Storage.Tree.from_list("root")
  ...> |> ImagesResource.Storage.Tree.insert_in(["foo"], new_image)
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
  def insert_in(tree, file = %File{path: path}), do: insert_in(tree, path, file)
  def insert_in(tree, path, value) when is_binary(path), do: insert_in(tree, directory_parts(path), value)
  def insert_in(tree = %Directory{name: path_name, children: children, path: path}, [], value) do
    {index, _child} = Directory.find_child(tree, value.name)

    value = case path_name do
              "root" -> Map.put(value, :path, [])
              _ -> Map.put(value, :path, path ++ [path_name])
            end

    if index do
      new_children = List.update_at(children, index, fn _ -> value end)
      %Directory{tree | children: new_children}
    else
      %Directory{tree | children: children ++ [value]}
    end
  end
  def insert_in(tree = %Directory{children: children}, [h | t], value) do
    {index, _child} = Directory.find_child_dir(tree, h)

    if index do
      new_children = List.update_at(children, index, fn child -> insert_in(child, t, value) end)
      %Directory{tree | children: new_children}
    else
      raise "Directory #{h} not found in tree! #{inspect tree}"
    end
  end

  defp make_directories(tree, file_list) do
    file_list
    |> Enum.map(fn file -> file.path end)
    |> Enum.filter(fn path -> path != [] end)
    |> Enum.map(&Path.join/1)
    |> Enum.uniq
    |> Enum.sort
    |> Enum.map(&Path.split/1)
    |> Enum.reduce(tree, fn path, tree ->
      make_directories(path, [], tree)
    end)
  end
  defp make_directories([], _, tree), do: tree
  defp make_directories([h | t], path, tree = %Directory{children: children}) do
    {index, _child} = Directory.find_child_dir(tree, h)

    if index do
      new_children = List.update_at(children, index, fn child -> make_directories(t, path ++ [h], child) end)
      %Directory{tree | children: new_children}
    else
      new_dir = Directory.new(h, path)
      %Directory{tree | children: children ++ [make_directories(t, path ++ [h], new_dir)]}
    end
  end

  defp directory_parts(file_name) do
    case Path.dirname(file_name) do
      "." -> []
      dirname -> Path.split(dirname)
    end
  end

  @doc ~S"""
  Compares two trees and lists the operations to make dest look like source

  ## Examples
  iex> source = [
  ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
  ...>   %ImagesResource.Storage.File{name: "qux.txt", path: ["foo"]},
  ...>   %ImagesResource.Storage.File{name: "foo.txt", path: []}
  ...> ]
  ...> |> ImagesResource.Storage.Tree.from_list("root")
  ...> dest = [
  ...>   %ImagesResource.Storage.File{name: "bae.txt", path: ["foo", "bar"]},
  ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
  ...>   %ImagesResource.Storage.File{name: "qux.txt", path: ["qux"]}
  ...> ]
  ...> |> ImagesResource.Storage.Tree.from_list("root")
  ...> ImagesResource.Storage.Tree.diff(source, dest)
  [
    {:remove, %ImagesResource.Storage.File{last_modified: nil, name: "bae.txt", path: ["foo", "bar"], size: nil}},
    {:remove, %ImagesResource.Storage.File{last_modified: nil, name: "qux.txt", path: ["qux"], size: nil}},
    {:add, %ImagesResource.Storage.File{last_modified: nil, name: "qux.txt", path: ["foo"], size: nil}},
    {:add, %ImagesResource.Storage.File{last_modified: nil, name: "foo.txt", path: [], size: nil}}
  ]
  """
  def diff(source, dest), do: diff(:remove, source, dest) ++ diff(:add, source, dest)
  def diff(:add, %Directory{children: source_children}, dest) do
    Enum.flat_map(source_children, fn
      source_child = %Directory{name: source_child_name} ->
        case Directory.find_child(dest, source_child_name) do
          {nil, _} ->
            source_child
            |> Directory.flat_children
            |> Enum.map(fn child -> {:add, child} end)
          {_, dest_child} ->
            diff(:add, source_child, dest_child)
        end
      source_child = %File{name: source_child_name} ->
        case Directory.find_child(dest, source_child_name) do
          {nil, _} -> [{:add, source_child}]
          {_, _dest_child} -> []
        end
    end)
  end
  def diff(:remove, source, %Directory{children: dest_children}) do
    Enum.flat_map(dest_children, fn
      dest_child = %Directory{name: dest_child_name} ->
        case Directory.find_child(source, dest_child_name) do
          {nil, _} ->
            dest_child
            |> Directory.flat_children
            |> Enum.map(fn child -> {:remove, child} end)
          {_, source_child} ->
            diff(:remove, source_child, dest_child)
        end
      dest_child = %File{name: dest_child_name} ->
        case Directory.find_child(source, dest_child_name) do
          {nil, _} -> [{:remove, dest_child}]
          {_, _dest_child} -> []
        end
    end)
  end
end
