defmodule ImagesResource.Image do
  require Logger

  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Storage.{File, S3}
  alias ImagesResource.Upload.Upload

  def url(_, _, options \\ [])

  def url(%File{name: name, path: path}, version, options) do
    bucket = Keyword.get(options, :bucket, bucket())

    "https://#{bucket}.#{endpoint()}"
    |> Path.join(Upload.s3_key(version, path, name))
    |> URI.encode()
  end

  def url(string, version, options) do
    url(%File{name: string, path: ""}, version, options)
  end

  def s3_path(image, version) do
    base_url =
      ""
      |> url(version)
      |> URI.decode()
      |> URI.parse()
      |> Map.get(:path)
      |> Path.dirname()

    image
    |> url(version)
    |> URI.decode()
    |> String.split(base_url, trim: true)
    |> Enum.at(1)
    |> String.slice(1..-1)
  end

  def type(image, version) do
    image
    |> url(version)
    |> Path.extname()
    |> String.slice(1..-1)
    |> case do
      "jpg" -> "jpeg"
      t -> t
    end
  end

  def base_64(file = %File{}, version) do
    with path <- s3_path(file, version),
         {:ok, raw_data} <- S3.get_data(path, bucket: Config.get(:images_resource, :dest_bucket)),
         base64_data <- :base64.encode(raw_data),
         extension <- type(file, version),
         output <- "data:image/" <> extension <> ";base64," <> base64_data do
      {:ok, output}
    else
      e ->
        Logger.error(
          "Base64 Failed: Unable to read file #{url(file, version)}. Error: #{inspect(e)}"
        )

        {:error, "Unable to read file #{url(file, version)}. Error: #{inspect(e)}"}
    end
  end

  def size(file = %File{}, version) do
    try do
      file
      |> url(version)
      |> Fastimage.size()
      |> case do
        :unknown_type ->
          Logger.error(
            "Fast Image Failed: Unable to read file #{url(file, version)}. Error: unknown_type"
          )

          {:error, "Unable to read file #{url(file, version)}. Error: unknown_type"}

        size ->
          {:ok, size}
      end
    rescue
      e ->
        Logger.error(
          "Fast Image Failed: Unable to read file #{url(file, version)}. Error: #{inspect(e)}"
        )

        {:error, "Unable to read file #{url(file, version)}. Error: #{inspect(e)}"}
    end
  end

  defp bucket do
    Config.get(:images_resource, :dest_bucket)
  end

  defp endpoint do
    System.get_env("ASSET_HOST")
  end
end
