defmodule ImagesResource.Image do
  require Logger

  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.Storage.{File, S3}

  def url(%File{name: name, path: path}, version), do: ImagesResource.Uploaders.Image.url({name, path}, version)
  def url(string, version), do: ImagesResource.Uploaders.Image.url(string, version)

  def s3_path(image, version) do
    base_url = ""
               |> url(version)
               |> URI.decode
               |> URI.parse
               |> Map.get(:path)
               |> Path.dirname

    image
    |> url(version)
    |> URI.decode
    |> String.split(base_url, trim: true)
    |> Enum.at(1)
    |> String.slice(1..-1)
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
    cache_key = {File.cache_key(file), :base64, version}
    Logger.debug "Fetching #{inspect cache_key} from cache"

    case Cachex.get(:my_cache, cache_key) do
      {:ok, output} ->
        Logger.debug "Cache Hit: #{inspect cache_key}"
        {:ok, output}
      { :missing, nil } ->
        Logger.info "Cache Miss: #{inspect cache_key}"

        with path            <- s3_path(file, version),
             {:ok, raw_data} <- S3.get_data(path, bucket: Config.get(:images_resource, :dest_bucket)),
             base64_data     <- :base64.encode(raw_data),
             extension       <- type(file, version),
             output          <- "data:image/" <> extension <> ";base64," <> base64_data do

          Cachex.set(:my_cache, cache_key, output)

          {:ok, output}
        else
          e ->
            Logger.error "Base64 Failed: Unable to read file #{url(file, version)}. Error: #{inspect e}"
            {:error, "Unable to read file #{url(file, version)}. Error: #{inspect e}"}
        end
    end
  end

  def size(file = %File{}, version) do
    cache_key = {File.cache_key(file), :size, version}
    Logger.debug "Fetching #{inspect cache_key} from cache"

    case Cachex.get(:my_cache, cache_key) do
      {:ok, output} ->
        Logger.debug "Cache Hit: #{inspect cache_key}"
        {:ok, output}
      { :missing, nil } ->
        Logger.info "Cache Miss: #{inspect cache_key}"

        try do
          size = file
                 |> url(version)
                 |> Fastimage.size

            Cachex.set(:my_cache, cache_key, size)

            {:ok, size}
        rescue
          e ->
            Logger.error "Fast Image Failed: Unable to read file #{url(file, version)}. Error: #{inspect e}"
            {:error, "Unable to read file #{url(file, version)}. Error: #{inspect e}"}
        end
    end
  end
end
