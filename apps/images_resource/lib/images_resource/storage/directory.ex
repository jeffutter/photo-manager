defmodule ImagesResource.Storage.Directory do
  @type t :: %{name: String.t, children: list(Directory.t | File.t), path: list(String.t)}
  defstruct name: "", children: [], path: []

  def new(name, path \\ []) do
    %__MODULE__{name: name, path: path}
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
    %ImagesResource.Storage.File{name: "baz.txt", path: ["foo", "bar"]},
    %ImagesResource.Storage.File{name: "qux.txt", path: ["foo"]},
    %ImagesResource.Storage.File{name: "foo.txt", path: []}
  ]
  """
  def flat_children(%__MODULE__{children: children}) do
    Enum.flat_map(children, fn
      child = %__MODULE__{} -> flat_children(child)
      file -> [file]
    end)
  end

  def find_child(%__MODULE__{children: children}, name) do
    case Enum.find_index(children, fn %{name: child_name} -> child_name == name end) do
      nil -> {nil, nil}
      index -> {index, Enum.at(children, index)}
    end
  end

  def find_child_dir(%__MODULE__{children: children}, name) do
    index = Enum.find_index(children, fn
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
