defmodule ImagesResource.Gallery do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Image

  @type t :: %{name: String.t}
  defstruct name: ""

  def ls(path \\ "/")
  def ls(path) when is_map(path) do
    path
    |> Map.get(:name)
    |> ls
  end
  def ls(path) do
    [ImagesResource.base_dir, path]
    |> Path.join
    |> File.ls!
    |> Enum.filter(&image?(path, &1))
    |> Enum.map(&Image.to_struct(path, &1))
  end

  def to_struct(file_name) do
    %__MODULE__{name: file_name}
  end

  defp image?(path, file_name) do
    [ImagesResource.base_dir, path, file_name]
    |> Path.join
    |> File.dir?
    |> Kernel.!
  end
end
