defmodule ImagesResource.Upload.Primary do
  require Logger

  alias ImagesResource.Queue.Queue
  alias ImagesResource.Storage.{S3}
  alias ImagesResource.Storage.File, as: StorageFile
  alias ImagesResource.Upload.Upload

  use ImagesResource.Queue.Worker

  defstruct event: nil,
            tempfiles: [],
            original_path: [],
            error: false,
            error_message: nil,
            versions: []

  @versions [:original, :thumb, :small, :medium, :large]

  @behaviour ImagesResource.Queue.Worker
  def handle_event(event = {:add, file}) do
    %__MODULE__{event: event}
    |> download()
    |> transform()
    |> upload(file)
    |> cleanup()
    |> reply()
  end

  def handle_event({:remove, %StorageFile{name: name, path: path}}) do
    # TODO: Needs more error handling
    Enum.each(@versions, fn version ->
      key = Upload.s3_key(version, path, name)
      S3.delete(key, bucket: Config.get(:images_resource, :dest_bucket))
    end)

    {:ok, nil}
  end

  def download(status = %__MODULE__{error: false, event: {:add, f}}) do
    case sub_queue(DownloadQueue, f) do
      {:ok, path} -> %__MODULE__{status | original_path: path}
      {:error, e} -> %__MODULE__{status | error: true, error_message: e}
    end
  end

  def download(status), do: status

  def transform(status = %__MODULE__{error: false, original_path: original_path}) do
    messages = Enum.map(@versions, fn version -> {version, {original_path, version}} end)

    case batch_subqueue(TransformQueue, messages) do
      {:ok, results} ->
        paths = for {_, {:ok, path}} <- results, do: path
        %__MODULE__{status | tempfiles: paths, versions: results}

      {:error, e, results} ->
        paths = for {_, {:ok, path}} <- results, do: path
        %__MODULE__{status | tempfiles: paths, versions: results, error: true, error_message: e}
    end
  end

  def transform(status), do: status

  def upload(status = %__MODULE__{error: false, versions: versions}, file) do
    messages =
      Enum.map(versions, fn {version, {:ok, thumb_path}} ->
        {version, {thumb_path, version, file}}
      end)

    case batch_subqueue(UploadQueue, messages) do
      {:ok, results} ->
        %__MODULE__{status | versions: results}

      {:error, e, results} ->
        %__MODULE__{status | versions: results, error: true, error_message: e}
    end
  end

  def upload(status, _), do: status

  def cleanup(status = %__MODULE__{original_path: original_path, tempfiles: tempfiles}) do
    [original_path | tempfiles]
    |> Enum.each(fn path ->
         # TODO: Convert to queue, catch errors from File.rm
         File.rm(path)
       end)

    status
  end

  def reply(%__MODULE__{error: false}) do
    {:ok, nil}
  end

  def reply(%__MODULE__{error: true, error_message: error_message}) do
    {:retry, error_message}
  end

  def random_version() do
    20
    |> :crypto.strong_rand_bytes()
    |> Base.encode32()
  end

  defp sub_queue(module, message, timeout \\ 5_000) do
    Queue.add(module, message)

    receive do
      {:ok, message} ->
        {:ok, message}

      {:error, e} ->
        {:error, e}

      unknown ->
        Logger.error("Unknown Message: #{inspect(unknown)}")
        {:ok, :ok}
    after
      timeout -> {:error, "timeout"}
    end
  end

  defp batch_subqueue(module, messages, options \\ []) do
    instance_timeout = Keyword.get(options, :instance_timeout, 5_000)
    batch_timeout = Keyword.get(options, :batch_timeout, 20_000)

    results =
      messages
      |> Enum.map(fn {id, message} ->
           Task.async(fn ->
             case sub_queue(module, message, instance_timeout) do
               {:ok, message} -> {id, {:ok, message}}
               {:error, e} -> {id, {:error, e}}
             end
           end)
         end)
      |> Task.yield_many(batch_timeout)
      |> Enum.map(fn {task, res} ->
           res || Task.shutdown(task, :brutal_kill)
         end)
      |> Enum.map(fn
           {:ok, {id, {:ok, message}}} -> {id, {:ok, message}}
           {:ok, {id, {:error, e}}} -> {id, {:error, e}}
           {:exit, _} -> {random_version(), {:error, "Task Exited"}}
           e -> {random_version(), {:error, "Unexpeceted Task Error: #{e}"}}
         end)

    if Enum.all?(results, fn
         {_, {:ok, _}} -> true
         _ -> false
       end) do
      {:ok, Enum.into(results, %{})}
    else
      {
        :error,
        "One or more failures in #{inspect(module)} task results: #{inspect(results)}",
        results
      }
    end
  end
end
