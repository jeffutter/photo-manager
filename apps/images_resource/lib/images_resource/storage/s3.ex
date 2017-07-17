defmodule ImagesResource.Storage.S3 do
  alias ExAws.{S3}

  def ls(path \\ "/", opts \\ []) do
    Keyword.get(opts, :bucket, bucket())
    |> S3.list_objects(prefix: path)
    |> ExAws.stream!
    |> Enum.to_list
    |> Enum.map(fn obj -> obj.key end)
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

  defp bucket do
    {:ok, bucket_name} = Application.fetch_env(:arc, :bucket)

    case bucket_name do
      {:system, env_var} when is_binary(env_var) -> System.get_env(env_var)
      name -> name
    end
  end
end
