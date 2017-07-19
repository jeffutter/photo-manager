defmodule ImagesResource.Galleries do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Gallery

  def ls(path \\ "/") do
    case ImagesResource.Storage.S3.ls_directories(path, bucket: "image-source") do
      {:ok, list} ->
        {:ok, Enum.map(list, &Gallery.to_struct/1)}
      {:error, e} -> {:error, e}
    end
  end
end
