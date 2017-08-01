defmodule ImagesResource.Storage.S3 do
  alias ExAws.{S3}
  alias ImagesResource.Storage.{File, Tree}

  def ls_tree(path \\ "/", opts \\ []) do
    bucket = Keyword.get(opts, :bucket, bucket())
    strip_prefix = Keyword.get(opts, :strip_prefix, [])
    try do
      tree = bucket
             |> S3.list_objects(prefix: path)
             |> ExAws.stream!
             |> Enum.to_list
             |> Enum.map(&File.from_aws_obj(&1, strip_prefix: strip_prefix))
             |> Tree.from_list("root")
      {:ok, tree}
    rescue
      e in ExAws.Error ->
        raise e
        {:error, "Unable to list bucket: #{bucket}, path: #{path} - #{inspect e}"}
    end
  end

  def ls(path \\ "/", opts \\ []) do
    bucket = Keyword.get(opts, :bucket, bucket())
    try do
      list = bucket
             |> S3.list_objects(prefix: path)
             |> ExAws.stream!
             |> Enum.to_list
             |> Enum.map(fn obj ->
               %{
                 name: obj.key,
                 size: obj.size,
                 last_modified: obj.last_modified
               }
             end)

      {:ok, list}
    rescue
      e in ExAws.Error ->
        {:error, "Unable to list bucket: #{bucket}, path: #{path} - #{inspect e}"}
    end
  end

  def ls_directories(path \\ "/", opts \\ []) do
    case ls(path, opts) do
      {:ok, list} ->
        list = list
        |> Enum.map(fn file -> Path.dirname(file.name) end)
        |> Enum.uniq
        |> Enum.sort
        {:ok, list}
      {:error, e} -> {:error, e}
    end
  end

  def exist?(full_path, path \\ "/", opts \\ []) do
    case ls(path, opts) do
      {:ok, list} ->
        {:ok, Enum.member?(list, full_path)}
      {:error, e} -> {:error, e}
    end
  end

  def get(full_path, opts \\ []) do
    Keyword.get(opts, :bucket, bucket())
    |> S3.get_object(full_path)
    |> ExAws.request
  end

  def get_data(full_path, opts \\ []) do
    {:ok, %{body: data}} = get(full_path, opts)
    {:ok, data}
  end

  defp bucket do
    Config.get(:arc, :bucket)
  end
end
