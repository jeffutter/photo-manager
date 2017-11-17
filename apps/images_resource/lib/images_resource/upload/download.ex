defmodule ImagesResource.Upload.Download do
  alias File, as: OSFile
  alias ImagesResource.Storage.File, as: StorageFile
  alias ImagesResource.Storage.S3

  use ImagesResource.Queue.Worker

  @behaviour ImagesResource.Queue.Worker
  def handle_event(file) do
    with source_bucket <- Config.get(:images_resource, :source_bucket),
         full_path <- StorageFile.full_path(file),
         {:ok, data} <- S3.get_data(full_path, bucket: source_bucket),
         {:ok, path} <- write_binary(full_path, data) do
      {:ok, path}
    else
      {:error, e} ->
        {:error, e}
    end
  end

  defp write_binary(full_path, binary) do
    path = generate_temporary_path(full_path)

    case OSFile.write(path, binary) do
      {:error, reason} -> {:error, reason}
      :ok -> {:ok, path}
    end
  end

  defp generate_temporary_path(full_path) do
    extension = Path.extname(full_path || "")

    file_name =
      :crypto.strong_rand_bytes(20)
      |> Base.encode32()
      |> Kernel.<>(extension)

    Path.join(System.tmp_dir(), file_name)
  end
end
