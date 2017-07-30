defmodule ImagesResource.Storage.File do
  @type t :: %{name: String.t, size: integer, last_modified: DateTime.t, path: list(String.t)}
  defstruct name: "", size: nil, last_modified: nil, path: []

  def full_path(%__MODULE__{name: name, path: path}) do
    path ++ [name]
    |> Path.join
  end

  def split_path(path) when is_binary(path) do
    case Path.dirname(path) do
      "." -> []
      "/" -> []
      dirname ->
        dirname
        |> Path.split
        |> Enum.filter(fn path_part -> path_part != "/" end)
    end
  end

  def from_aws_obj(%{key: key, last_modified: last_modified, size: size}) do
    path = split_path(key)

    %__MODULE__{
      name: Path.basename(key),
      size: size,
      last_modified: last_modified,
      path: path
    }
  end
end
