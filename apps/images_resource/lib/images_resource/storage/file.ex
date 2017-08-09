defmodule ImagesResource.Storage.File do
  @type t :: %{name: String.t, size: integer, last_modified: DateTime.t, path: list(String.t), slug: String.t}
  defstruct name: "", size: nil, last_modified: nil, path: [], slug: ""

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

  def from_aws_obj(%{key: key, last_modified: last_modified, size: size}, opts \\ []) do
    strip_prefix = Keyword.get(opts, :strip_prefix, [])

    path = key
           |> split_path
           |> strip_prefix(strip_prefix)

    name = Path.basename(key)

    %__MODULE__{
      name: name,
      path: path,
      slug: slug(path, name),
      size: size,
      last_modified: last_modified,
    }
  end

  def cache_key(%__MODULE__{name: name, path: path, last_modified: last_modified}) do
    path = case path do
             [] -> ""
             arry -> Path.join(arry)
           end
    {name, path, last_modified}
  end

  def slug(path, name) do
    path ++ [name]
    |> Path.join
    |> slug
  end
  def slug(name) do
    name
    |> String.downcase
    |> String.replace(~r/([^a-z0-9\/\.])+/, "-")
    |> String.trim("-")
  end

  defp strip_prefix([], _), do: []
  defp strip_prefix([h|t], [i|u]) when h == i, do: strip_prefix(t, u)
  defp strip_prefix(path, _), do: path
end
