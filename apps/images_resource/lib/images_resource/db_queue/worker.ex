defmodule ImagesResource.DBQueue.Worker do
  require Logger

  alias ImagesResource.SyncDB

  use ImagesResource.Queue.Worker

  @behaviour ImagesResource.Queue.Worker
  def handle_event({{:add, file}, version}) do
    case SyncDB.add(file, version) do
      {:ok, _} ->
        {:ok, nil}

      {:error, :internet_error} ->
        {:retry, "Internet Error"}

      {:error, message} ->
        {:error, message}
    end
  rescue
    e ->
      {:error, e}
  end

  def handle_event({{:remove, file}, version}) do
    SyncDB.remove(file, version)
    {:ok, nil}
  rescue
    e ->
      {:error, e}
  end
end
