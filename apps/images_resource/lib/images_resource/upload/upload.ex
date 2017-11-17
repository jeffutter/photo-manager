defmodule ImagesResource.Upload.Upload do
  alias ImagesResource.Storage.S3

  use ImagesResource.Queue.Worker

  @behaviour ImagesResource.Queue.Worker
  def handle_event({new_path, version, file}) do
    key = s3_key(version, file.path, file.name)

    s3_options =
      s3_object_headers(version, file.name)
      |> ensure_keyword_list()
      |> Keyword.put(:acl, :public_read)

    case S3.put(new_path, key, s3_options, bucket: Config.get(:images_resource, :dest_bucket)) do
      :ok ->
        {:ok, nil}

      {:error, e} ->
        {:error, e}
    end
  end

  def s3_key(version, path, file_name) do
    version
    |> storage_dir(path)
    |> Path.join(file_name)
  end

  def storage_dir(version, nil), do: storage_dir(version, [])
  def storage_dir(version, ""), do: storage_dir(version, [])
  # def storage_dir(version, []), do: ""

  def storage_dir(version, path) do
    Path.join(["#{version}"] ++ path)
  end

  def s3_object_headers(_version, file_name) do
    [content_type: MIME.from_path(file_name)]
  end

  defp ensure_keyword_list(list) when is_list(list), do: list
  defp ensure_keyword_list(map) when is_map(map), do: Map.to_list(map)
end
