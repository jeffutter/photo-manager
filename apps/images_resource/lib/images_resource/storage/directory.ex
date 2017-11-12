defmodule ImagesResource.Storage.Directory do
  alias ImagesResource.Utils

  @type t :: %{
          name: String.t(),
          children: list(Directory.t() | File.t()),
          path: list(String.t()),
          slug: String.t()
        }
  defstruct name: "", children: [], path: [], slug: ""

  def new(name, path \\ []) do
    %__MODULE__{name: name, path: path, slug: Utils.slug(path, name)}
  end

  @doc ~S"""
  Takes a directory and returns a flat list of all children

  ## Examples
  iex> [
  ...>   %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
  ...>   %ImagesResource.Storage.File{name: "qux.txt", path: ["foo"]},
  ...>   %ImagesResource.Storage.File{name: "foo.txt", path: []}
  ...> ]
  ...> |> ImagesResource.Storage.Tree.from_list("root")
  ...> |> ImagesResource.Storage.Directory.flat_children
  [
    %ImagesResource.Storage.File{last_modified: nil, name: "baz.txt", path: ["foo", "bar"], size: nil, slug: "foo/bar/baz.txt"},
    %ImagesResource.Storage.File{last_modified: nil, name: "qux.txt", path: ["foo"], size: nil, slug: "foo/qux.txt"},
    %ImagesResource.Storage.File{last_modified: nil, name: "foo.txt", path: [], size: nil, slug: "foo.txt"}
  ]
  """
  def flat_children(%__MODULE__{children: children}) do
    Enum.flat_map(children, fn
      child = %__MODULE__{} -> flat_children(child)
      file -> [file]
    end)
  end

  def find_child(%__MODULE__{children: children}, child, compare_func) do
    case Enum.find_index(children, fn directory_child -> compare_func.(child, directory_child) end) do
      nil -> {nil, nil}
      index -> {index, Enum.at(children, index)}
    end
  end

  def find_child_dir(%__MODULE__{children: children}, name) do
    index =
      Enum.find_index(children, fn
        %__MODULE__{name: child_name} -> child_name == name
        _ -> false
      end)

    if index do
      {index, Enum.at(children, index)}
    else
      {nil, nil}
    end
  end
end
