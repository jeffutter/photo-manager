defmodule ImagesResource.DBQueue.Worker do
  require Logger

  alias ImagesResource.SyncDB
  alias ImagesResource.{Queue, Job}

  def start_link(job = %Job{queue: queue, event: {{:add, file}, version}}) do
    Logger.info("DB Storing: #{inspect(file)}")

    Task.start_link(fn ->
      try do
        case SyncDB.add(file, version) do
          {:ok, _} ->
            Queue.ack(queue, job)
            :ok

          {:error, :internet_error} ->
            Logger.error("Internet Error For: #{inspect(file)} - requeuing.")
            Queue.nack(queue, job)
            :ok

          {:error, message} ->
            Logger.error(
              "Unknown Error Occurred Adding To DB: message: #{message}, file: #{inspect(file)}"
            )

            Queue.ack(queue, job)
            :ok
        end
      rescue
        e ->
          "Unknown Error DB Storing: #{inspect(file)} - Error: #{inspect e}"
          Queue.ack(queue, job)
          :ok
      end
    end)
  end

  def start_link(job = %Job{queue: queue, event: {{:remove, file}, version}}) do
    Logger.info("DB Removing: #{inspect(file)}")

    Task.start_link(fn ->
      try do
        SyncDB.remove(file, version)
        Queue.ack(queue, job)
        :ok
      rescue
        e ->
          "Unknown Error DB Removing: #{inspect(file)} - Error: #{inspect e}"
          Queue.ack(queue, job)
          :ok
      end
    end)
  end
end
