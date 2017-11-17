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
    case Queue.add_sync(DownloadQueue, f) do
      {:ok, path} -> %__MODULE__{status | original_path: path}
      {:error, e} -> %__MODULE__{status | error: true, error_message: e}
    end
  end

  def download(status), do: status

  def transform(status = %__MODULE__{error: false, original_path: original_path}) do
    messages = Enum.map(@versions, fn version -> {version, {original_path, version}} end)

    case Queue.add_sync_batch(TransformQueue, messages) do
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

    case Queue.add_sync_batch(UploadQueue, messages) do
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
end
