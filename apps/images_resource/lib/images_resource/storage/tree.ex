defmodule ImagesResource.Storage.Tree do
  alias ImagesResource.Storage.{File, Directory}
  alias ImagesResource.Utils

  @doc ~S"""
  Takes a name for the directory and a list of files and returns the file/directory tree

  ## Examples
      iex> ImagesResource.Storage.Tree.from_list([], "root")
      %ImagesResource.Storage.Directory{name: "root", children: [], path: [], slug: "root"}

      iex> [
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt"},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: [], slug: "foo.txt"}
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
                    path: ["foo", "bar"],
                    slug: "foo/bar/baz.txt"
                  }
                ],
                path: ["foo"],
                slug: "foo/bar"
              }
            ],
            path: [],
            slug: "foo"
          },
          %ImagesResource.Storage.File{
            name: "foo.txt",
            path: [],
            slug: "foo.txt"
          }
        ],
        path: [],
        slug: "root"
      }
  """
  def from_list(file_list, root_name) when is_binary(root_name) do
    root =
      root_name
      |> Directory.new()
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
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt"},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: [], slug: "foo.txt"}
      ...> ]
      ...> |> ImagesResource.Storage.Tree.from_list("root")
      ...> |> ImagesResource.Storage.Tree.find_in(["foo", "bar", "baz.txt"])
      %ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt", size: nil}

      iex> [
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt"},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: [], slug: "foo.txt"}
      ...> ]
      ...> |> ImagesResource.Storage.Tree.from_list("root")
      ...> |> ImagesResource.Storage.Tree.find_in(["foo", "bar" ])
      %ImagesResource.Storage.Directory{
        children: [%ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt", size: nil}],
        name: "bar",
        path: ["foo"],
        slug: "foo/bar"
      }
  """
  def find_in(result, []), do: result

  def find_in(tree, [h | t]) do
    case Directory.find_child(tree, %File{name: h}, &compare_name/2) do
      {nil, nil} -> nil
      {_idx, child} -> find_in(child, t)
    end
  end

  @doc ~S"""
  Looks up a path in the tree

  ## Examples
      iex> [
      ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt"},
      ...>   %ImagesResource.Storage.File{name: "foo.txt", path: [], slug: "foo.txt"}
      ...> ]
      ...> |> ImagesResource.Storage.Tree.from_list("root")
      ...> |> ImagesResource.Storage.Tree.find_by_slug("foo/bar/baz.txt")
      %ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt", size: nil}
  """
  def find_by_slug(directory = %Directory{children: children, slug: dir_slug}, slug) do
    if dir_slug == slug do
      directory
    else
      if String.starts_with?(slug, dir_slug) || dir_slug == "root" do
        Enum.find_value(children, &find_by_slug(&1, slug))
      else
        nil
      end
    end
  end

  def find_by_slug(file = %File{slug: file_slug}, slug) do
    if file_slug == slug do
      file
    else
      nil
    end
  end

  def insert_in(tree, file = %File{path: path}), do: insert_in(tree, path, file)

  def insert_in(tree, path, value) when is_binary(path),
    do: insert_in(tree, directory_parts(path), value)

  def insert_in(tree = %Directory{name: path_name, children: children, path: path}, [], value) do
    {index, _child} = Directory.find_child(tree, value, &compare_name/2)

    value =
      case path_name do
        "root" -> Map.put(value, :path, [])
        _ -> Map.put(value, :path, path ++ [path_name])
      end

    value =
      case path_name do
        "root" -> Map.put(value, :slug, Utils.slug(value.name))
        _ -> Map.put(value, :slug, Utils.slug(path ++ [path_name], value.name))
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
      raise "Directory #{h} not found in tree! #{inspect(tree)}"
    end
  end

  defp make_directories(tree, file_list) do
    file_list
    |> Enum.map(fn file -> file.path end)
    |> Enum.filter(fn path -> path != [] end)
    |> Enum.map(&Path.join/1)
    |> Enum.uniq()
    |> Enum.sort()
    |> Enum.map(&Path.split/1)
    |> Enum.reduce(tree, fn path, tree ->
         make_directories(path, [], tree)
       end)
  end

  defp make_directories([], _, tree), do: tree

  defp make_directories([h | t], path, tree = %Directory{children: children}) do
    {index, _child} = Directory.find_child_dir(tree, h)

    if index do
      new_children =
        List.update_at(children, index, fn child -> make_directories(t, path ++ [h], child) end)

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
  ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt"},
  ...>   %ImagesResource.Storage.File{name: "qux.txt", path: ["foo"], slug: "foo/qux.txt"},
  ...>   %ImagesResource.Storage.File{name: "foo.txt", path: [], slug: "foo.txt"}
  ...> ]
  ...> |> ImagesResource.Storage.Tree.from_list("root")
  ...> dest = [
  ...>   %ImagesResource.Storage.File{name: "bae.txt", path: ["foo", "bar"], slug: "foo/bar/bae.txt"},
  ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"], slug: "foo/bar/baz.txt"},
  ...>   %ImagesResource.Storage.File{name: "qux.txt", path: ["qux"], slug: "qux/qux.txt"}
  ...> ]
  ...> |> ImagesResource.Storage.Tree.from_list("root")
  ...> ImagesResource.Storage.Tree.diff(source, dest)
  [
    {:remove, %ImagesResource.Storage.File{last_modified: nil, name: "bae.txt", path: ["foo", "bar"], slug: "foo/bar/bae.txt", size: nil}},
    {:remove, %ImagesResource.Storage.File{last_modified: nil, name: "qux.txt", path: ["qux"], slug: "qux/qux.txt", size: nil}},
    {:add, %ImagesResource.Storage.File{last_modified: nil, name: "qux.txt", path: ["foo"], slug: "foo/qux.txt", size: nil}},
    {:add, %ImagesResource.Storage.File{last_modified: nil, name: "foo.txt", path: [], slug: "foo.txt", size: nil}}
  ]
  """
  def diff(source, dest, compare_func \\ &compare_name/2),
    do: diff(:remove, source, dest, compare_func) ++ diff(:add, source, dest, compare_func)

  def diff(:add, %Directory{children: source_children}, dest, compare_func) do
    Enum.flat_map(source_children, add(dest, compare_func))
  end

  def diff(:remove, source, %Directory{children: dest_children}, compare_func) do
    Enum.flat_map(dest_children, remove(source, compare_func))
  end

  def compare_name(%{name: left_name}, %{name: right_name}) do
    left_name == right_name
  end

  defp add(dest, compare_func), do: fn source_child -> add(source_child, dest, compare_func) end

  defp add(source_child = %Directory{}, dest, compare_func) do
    case Directory.find_child(dest, source_child, compare_func) do
      {nil, _} ->
        source_child
        |> Directory.flat_children()
        |> Enum.map(fn child -> {:add, child} end)

      {_, dest_child} ->
        diff(:add, source_child, dest_child, compare_func)
    end
  end

  defp add(source_child = %File{}, dest, compare_func) do
    case Directory.find_child(dest, source_child, compare_func) do
      {nil, _} -> [{:add, source_child}]
      {_, _dest_child} -> []
    end
  end

  defp remove(source, compare_func) do
    fn dest_child ->
      remove(dest_child, source, compare_func)
    end
  end

  defp remove(dest_child = %Directory{}, source, compare_func) do
    case Directory.find_child(source, dest_child, compare_func) do
      {nil, _} ->
        dest_child
        |> Directory.flat_children()
        |> Enum.map(fn child -> {:remove, child} end)

      {_, source_child} ->
        diff(:remove, source_child, dest_child, compare_func)
    end
  end

  defp remove(dest_child = %File{}, source, compare_func) do
    case Directory.find_child(source, dest_child, compare_func) do
      {nil, _} -> [{:remove, dest_child}]
      {_, _dest_child} -> []
    end
  end
end
