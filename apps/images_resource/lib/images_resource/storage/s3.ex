defmodule ImagesResource.Storage.S3 do
  alias ExAws.{S3}

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

  def stat(full_path, opts \\ []) do
    {:ok, %{status_code: 200, headers: headers}} = Keyword.get(opts, :bucket, bucket())
    |> S3.head_object(full_path)
    |> ExAws.request

    h = headers
    |> Enum.into(%{})

    %{
      size: Map.get(h, "Content-Length"),
      type: Map.get(h, "Content-Type"),
      updated_at: Map.get(h, "Last-Modified"),
      full_path: full_path
    }
  end

  defp bucket do
    {:ok, bucket_name} = Application.fetch_env(:arc, :bucket)

    case bucket_name do
      {:system, env_var} when is_binary(env_var) -> System.get_env(env_var)
      name -> name
    end
  end
end
