defmodule ImagesResource.Image do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Storage.{File, S3}

  def url(file = %File{name: name, path: path}, version) do
    ImagesResource.Uploaders.Image.url({name, path}, version)
  end

  def s3_path(image, version) do
    base_url = Path.dirname(ImagesResource.Uploaders.Image.url("", version))
    image
    |> url(version)
    |> String.split(base_url, trim: true)
    |> Enum.at(0)
  end

  def type(image, version) do
    image
    |> url(version)
    |> Path.extname
    |> String.slice(1..-1)
    |> case do
         "jpg" -> "jpeg"
         t -> t
       end
  end

  def base_64(file = %File{}, version) do
    with path            <- s3_path(file, version),
         {:ok, raw_data} <- S3.get_data(path, bucket: "images"),
         base64_data     <- :base64.encode(raw_data),
         extension       <- type(file, version),
         output          <- "data:image/" <> extension <> ";base64," <> base64_data do
      {:ok, output}
    else
      _e ->
        {:error, "Unable to read file #{url(file, version)}"}
    end
  end
end
