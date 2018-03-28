defmodule ImagesResource.Storage.S3 do
  alias ExAws.{S3}
  alias ImagesResource.Storage.{Tree}
  alias File, as: OSFile
  alias ImagesResource.Storage.File, as: StorageFile

  require Logger

  def ls_tree(path \\ nil, opts \\ []) do
    bucket = Keyword.get(opts, :bucket, bucket())
    strip_prefix = Keyword.get(opts, :strip_prefix, [])

    try do
      tree =
        bucket
        |> S3.list_objects(prefix: path)
        |> ExAws.stream!()
        |> Enum.to_list()
        |> Enum.filter(fn %{size: size} -> size != "0" end)
        |> Enum.map(&StorageFile.from_aws_obj(&1, strip_prefix: strip_prefix))
        |> Tree.from_list("root")

      {:ok, tree}
    rescue
      e in ExAws.Error ->
        raise e
        {:error, "Unable to list bucket: #{bucket}, path: #{path} - #{inspect(e)}"}
    end
  end

  def get(full_path, opts \\ []) do
    opts
    |> Keyword.get(:bucket, bucket())
    |> S3.get_object(full_path)
    |> ExAws.request()
  end

  def get_data(full_path, opts \\ []) do
    case get(full_path, opts) do
      {:ok, %{body: data}} -> {:ok, data}
      {:error, e} -> {:error, e}
    end
  end

  def put(file_path, s3_key, s3_options, opts \\ []) do
    opts
    |> Keyword.get(:bucket, bucket())
    |> ExAws.S3.put_object(s3_key, OSFile.read!(file_path), s3_options)
    |> ExAws.request()
    |> case do
      {:ok, %{status_code: 200}} -> :ok
      {:ok, :done} -> :ok
      {:error, error} -> {:error, error}
    end
  rescue
    e in ExAws.Error ->
      Logger.error(inspect(e))
      Logger.error(e.message)
      {:error, :invalid_bucket}
  end

  def delete(s3_key, opts \\ []) do
    opts
    |> Keyword.get(:bucket, bucket())
    |> ExAws.S3.delete_object(s3_key)
  end

  defp bucket do
    Config.get(:images_resource, :source_bucket)
  end
end
