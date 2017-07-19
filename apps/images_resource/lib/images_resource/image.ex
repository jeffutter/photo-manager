defmodule ImagesResource.Image do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.{Gallery}

  @type t :: %{name: String.t, size: integer, last_modified: DateTime.t, gallery: Gallery.t}
  defstruct name: "", size: nil, last_modified: nil, gallery: %Gallery{}

  def to_struct(gallery = %Gallery{}, %{name: name, size: size, last_modified: last_modified}) do
    {:ok, modified, _offset} = DateTime.from_iso8601(last_modified)
    %__MODULE__{
      name: name,
      size: String.to_integer(size),
      last_modified: modified,
      gallery: gallery
    }
  end
  def to_struct(gallery = %Gallery{}, file_name) do
    %__MODULE__{name: file_name, gallery: gallery}
  end

  def relative_path(%__MODULE__{name: name, gallery: %Gallery{name: path}}) do
    [path, name]
    |> Path.join
  end

  def url(image, version) do
    image
    |> to_arc_tuple
    |> ImagesResource.Uploaders.Image.url(version)
  end

  def s3_path(image, version) do
    base_url = ImagesResource.Uploaders.Image.url("")
    image
    |> url(version)
    |> String.split(base_url, trim: true)
    |> Enum.at(0)
  end

  def type(image, version) do
    t = image
    |> url(version)
    |> Path.extname
    |> String.slice(1..-1)
    case t do
      "jpg" -> "jpeg"
      _ -> t
    end
  end

  def base_64(image, version) do
    with path <- s3_path(image, version),
         {:ok, raw_data} <- ImagesResource.Storage.S3.get_data(path, bucket: "images"),
         base64_data <- :base64.encode(raw_data),
         extension <- type(image, version),
         output <- "data:image/" <> extension <> ";base64," <> base64_data
      do
        {:ok, output}
      else
        {:error, :enoent} ->
          {:ok, _} = image
          |> to_arc_tuple
          |> ImagesResource.Uploaders.Image.store

          {:ok, output} = base_64(image, version)
          {:ok, output}
        _e ->
          {:error, "Unable to read file #{ImagesResource.Uploaders.Image.url(relative_path(image))}"}
    end
  end

  defp to_arc_tuple(image) do
    {relative_path(image), image.gallery}
  end
end
