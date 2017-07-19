defmodule ImagesResource.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      worker(ImagesResource.Sync, [[source: ImageSource, dest: ImageDest]]),
      worker(ImagesResource.Sources.S3, ["images", ImageDest], id: ImageDest),
      worker(ImagesResource.Sources.S3, ["image-source", ImageSource], id: ImageSource)
    ]

    opts = [strategy: :one_for_one, name: ImagesResource.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
