defmodule ImagesResource.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      worker(Cachex, [:my_cache, [limit: 500, default_ttl: 21600000]]),
      worker(ImagesResource.Sync, [[source: ImageSource, dest: ImageDest]]),
      worker(ImagesResource.Sources.S3, [Application.get_env(:images_resource, :dest_bucket), ImageDest], id: ImageDest),
      worker(ImagesResource.Sources.S3, [Application.get_env(:images_resource, :source_bucket), ImageSource], id: ImageSource)
    ]

    opts = [strategy: :one_for_one, name: ImagesResource.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
