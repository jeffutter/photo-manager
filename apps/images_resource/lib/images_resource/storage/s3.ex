defmodule ImagesResource.Storage.S3 do
  alias ExAws.{S3}

  def ls(path \\ "/", opts \\ []) do
    Keyword.get(opts, :bucket, bucket())
    |> S3.list_objects(prefix: path)
    |> ExAws.stream!
    |> Enum.to_list
    |> Enum.map(fn obj -> obj.key end)
  end

  def ls_directories(path \\ "/", opts \\ []) do
    ls(path, opts)
    |> Enum.map(fn file -> Path.dirname(file) end)
    |> Enum.uniq
    |> Enum.sort
  end

  def exist?(full_path, path \\ "/", opts \\ []) do
    path
    |> ls(opts)
    |> Enum.member?(full_path)
  end

  def get(full_path, opts \\ []) do
    Keyword.get(opts, :bucket, bucket())
    |> S3.get_object(full_path)
    |> ExAws.request
  end

  def get_data(full_path, opts \\ []) do
    get(full_path, opts)
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
