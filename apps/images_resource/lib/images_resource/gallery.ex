defmodule ImagesResource.Gallery do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Storage.{File, Tree}
  alias ImagesResource.Sources.S3

  def ls(path \\ [])
  def ls(path) when is_binary(path) do
    path <> "/"
    |> File.split_path
    |> ls
  end
  def ls(path) when is_list(path) do
    ImageSource
    |> S3.tree
    |> Tree.find_in(path)
  end
end
