defmodule ImagesResource.DBQueue.Worker do
  require Logger

  alias ImagesResource.SyncDB
  alias ImagesResource.DBQueue.Queue

  def start_link({{:add, file}, version}) do
    Logger.info "DB Storing: #{inspect file}"

    Task.start_link(fn ->
      case SyncDB.add(file, version) do
        {:ok, _} -> :ok
        {:error, :internet_error} ->
          Logger.error "Internet Error For: #{inspect file} - requeuing."
          Queue.add(file, version)
        {:error, message} ->
          Logger.error "Unknown Error Occurred Adding To DB: message: #{message}, file: #{inspect file}"
          :ok
      end
    end)
  end

  def start_link({{:remove, file}, version}) do
    Logger.info "DB Removing: #{inspect file}"

    Task.start_link(fn ->
      SyncDB.remove(file, version)
      :ok
    end)
  end
end