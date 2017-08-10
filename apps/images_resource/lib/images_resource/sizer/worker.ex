defmodule ImagesResource.Sizer.Worker do
  require Logger

  alias ImagesResource.Image
  alias ImagesResource.Sizer.Queue

  def start_link({file, version}) do
    Task.start_link(fn ->
      case Image.size(file, version) do
        {:ok, size} -> :ok
        {:error, _} -> Queue.add(file, version)
      end
    end)
  end
end