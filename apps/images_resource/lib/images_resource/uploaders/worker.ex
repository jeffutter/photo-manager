defmodule ImagesResource.Uploaders.Worker do
  require Logger

  alias ImagesResource.Storage.{S3, File}
  alias ImagesResource.Uploaders.Image
  alias ImagesResource.{Queue, Job}

  def start_link(job) do
    Task.start_link(fn ->
      process_sync(job)
    end)
  end

  defp process_sync(job = %Job{queue: queue, event: {:add, file = %File{name: name, path: path}}}) do
    Logger.info("S3 Storing: #{inspect(file)}")

    try do
      with source_bucket <- Config.get(:images_resource, :source_bucket),
           full_path <- File.full_path(file),
           {:ok, data} <- S3.get_data(full_path, bucket: source_bucket),
           {:ok, _} <- Image.store({%{filename: name, binary: data}, path}) do
        Queue.ack(queue, job)
        :ok
      else
        {:error, e} ->
          Queue.ack(queue, job)
          Logger.error("Failed to upload to S3 #{inspect(e)}")
      end
    rescue
      e in HTTPoison.Error ->
        case e.reason do
          :timeout ->
            Logger.error("Request timed out for #{inspect(file)} - requeuing.")
            Queue.nack(queue, job)

          _ ->
            Queue.ack(queue, job)
            stacktrace = System.stacktrace()
            reraise e, stacktrace
        end
    end
  end

  defp process_sync(
         job = %Job{queue: queue, event: {:remove, file = %File{name: name, path: path}}}
       ) do
    Logger.info("Deleting: #{inspect(file)}")
    Image.delete({name, path})
    Queue.ack(queue, job)
  end
end
