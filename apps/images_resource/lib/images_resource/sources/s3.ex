defmodule ImagesResource.Sources.S3 do
  require Logger

  use ImagesResource.Sources.Server

  alias ImagesResource.Storage.S3

  def refresh(state = %__MODULE__{name: name, sync_targets: sync_targets, options: options}) do
    path = Keyword.get(options, :path)
    bucket_name = Keyword.get(options, :bucket_name)
    strip_prefix = Keyword.get(options, :strip_prefix)

    Logger.info(
      "Refreshing #{inspect(bucket_name)} for #{inspect(name)} with, path: #{inspect(path)} and stripping: #{
        inspect(strip_prefix)
      }"
    )

    case S3.ls_tree(path, bucket: bucket_name, strip_prefix: strip_prefix) do
      {:ok, tree} ->
        state = %__MODULE__{state | tree: tree}

        Enum.each(sync_targets, fn sync_target ->
          GenServer.cast(sync_target, {:updated, name, tree})
        end)

        Logger.info("Refresh complete for #{inspect(bucket_name)} for #{inspect(name)}")

        {:ok, state}

      {:error, e} ->
        {:error, e}
    end
  end
end
