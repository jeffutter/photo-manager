defmodule ImagesResource.Storage.S3 do
  alias ExAws.{S3}
  alias ImagesResource.Storage.{File, Tree}

  def ls_tree(path \\ nil, opts \\ []) do
    bucket = Keyword.get(opts, :bucket, bucket())
    strip_prefix = Keyword.get(opts, :strip_prefix, [])
    try do
      tree = bucket
             |> S3.list_objects(prefix: path)
             |> ExAws.stream!
             |> Enum.to_list
             |> Enum.filter(fn %{size: size} -> size != "0" end)
             |> Enum.map(&File.from_aws_obj(&1, strip_prefix: strip_prefix))
             |> Tree.from_list("root")
      {:ok, tree}
    rescue
      e in ExAws.Error ->
        raise e
        {:error, "Unable to list bucket: #{bucket}, path: #{path} - #{inspect e}"}
    end
  end

  def get(full_path, opts \\ []) do
    opts
    |> Keyword.get(:bucket, bucket())
    |> S3.get_object(full_path)
    |> ExAws.request
  end

  def get_data(full_path, opts \\ []) do
    case get(full_path, opts) do
      {:ok, %{body: data}} -> {:ok, data}
      {:error, e} -> {:error, e}
    end
  end

  defp bucket do
    Config.get(:arc, :bucket)
  end
end
