defmodule ImagesResource.Gallery do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Storage.Tree
  alias ImagesResource.Sources.S3

  def find_by_slug(slug) do
    ImageSource
    |> S3.tree
    |> Tree.find_by_slug(slug)
  end
end
