defmodule ImagesResource.Galleries do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Gallery

  def ls(path \\ "/") do
    [ImagesResource.base_dir, path]
    |> Path.join
    |> File.ls!
    |> Enum.filter(&dir?(path, &1))
    |> Enum.map(&Gallery.to_struct/1)
  end

  defp dir?(path, file_name) do
    [ImagesResource.base_dir, path, file_name]
    |> Path.join
    |> File.dir?
  end
end
