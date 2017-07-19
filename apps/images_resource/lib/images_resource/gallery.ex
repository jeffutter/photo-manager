defmodule ImagesResource.Gallery do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Image

  @type t :: %{name: String.t}
  defstruct name: ""

  def ls(path \\ "/")
  def ls(gallery = %__MODULE__{name: name}) do
    case ls(name) do
      {:ok, list} ->
        {:ok, Enum.map(list, &Image.to_struct(gallery, &1))}
      {:error, e} -> {:error, e}
    end
  end
  def ls(path) do
    ImagesResource.Storage.S3.ls(path, bucket: "image-source")
  end

  def to_struct(file_name) do
    %__MODULE__{name: file_name}
  end
end
