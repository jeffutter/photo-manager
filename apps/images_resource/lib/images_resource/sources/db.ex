defmodule ImagesResource.Sources.DB do
  require Logger
  use ImagesResource.Sources.Server

  alias ImagesResource.Storage.DB

  def refresh(state = %__MODULE__{name: name, sync_targets: sync_targets}) do
    Logger.info "Refreshing DB for #{inspect name}."

    case DB.ls_tree(nil) do
      {:ok, tree} ->
        state = %__MODULE__{state | tree: tree}

        Enum.each(sync_targets, fn sync_target ->
          GenServer.cast(sync_target, {:updated, name, tree})
        end)
        Logger.info "Refresh complete for DB for #{inspect name}"

        {:ok, state}
      {:error, e} -> {:error, e}
    end
  end
end
