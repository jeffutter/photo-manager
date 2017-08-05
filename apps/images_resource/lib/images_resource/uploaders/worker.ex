defmodule ImagesResource.Uploaders.Worker do
  require Logger

  alias ImagesResource.Storage.{S3, File}
  alias ImagesResource.Uploaders.{Image, Queue}

  def start_link(event) do
    Task.start_link(fn ->
      process_sync(event)
    end)
  end

  defp process_sync( event = {:add, file = %File{name: name, path: path}}) do
    Logger.info "Storing: #{inspect file}"

    try do
      with source_bucket <- Config.get(:images_resource, :source_bucket),
               full_path <- File.full_path(file),
             {:ok, data} <- S3.get_data(full_path, bucket: source_bucket),
                {:ok, _} <- Image.store({%{filename: name, binary: data}, path}) do
        :ok
      else
        {:error, e} ->
          Logger.error "Failed to upload to S3 #{inspect e}"
      end
    rescue
      e in HTTPoison.Error ->
        case e.reason do
          :timeout ->
            Logger.error "Request timed out for #{inspect file} - requeuing."
            Queue.add(event)
          _ -> raise e
        end
    end
  end

  defp process_sync({:remove, file = %File{name: name, path: path}}) do
    Logger.info "Deleting: #{inspect file}"
    Image.delete({name, path})
  end
end
