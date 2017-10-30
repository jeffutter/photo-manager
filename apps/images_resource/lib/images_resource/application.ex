defmodule ImagesResource.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    case System.get_env("AWS_ENDPOINT") do
      nil -> :noop
      uri ->
        %{scheme: scheme, host: host, port: port} = URI.parse(uri)

        Application.put_env(:ex_aws, :s3, [
            scheme: scheme,
            host: host,
            port: port
          ]
        )
    end

    import Supervisor.Spec, warn: false

    children = [
      worker(Cachex, [:my_cache, [limit: 1000, default_ttl: 21600000]]),
      worker(ImagesResource.Sizer.Queue, []),
      worker(ImagesResource.Sizer.Processor, []),
      worker(ImagesResource.Uploaders.Queue, []),
      worker(ImagesResource.Uploaders.Processor, []),
      worker(ImagesResource.DBQueue.Queue, []),
      worker(ImagesResource.DBQueue.Processor, []),
      worker(ImagesResource.Sync, [[source: ImageSource, dest: ImageDest, name: Sync1]], id: Sync1),
      worker(ImagesResource.SyncDB, [[source: FullDest,    dest: DBDest, name: Sync2]], id: Sync2),
      worker(ImagesResource.Sources.S3, [Config.get(:images_resource, :dest_bucket),   ImageDest, [path: "original", strip_prefix: ["original"], sync_target: Sync1]], id: ImageDest),
      worker(ImagesResource.Sources.S3, [Config.get(:images_resource, :source_bucket), ImageSource, [sync_target: Sync1]], id: ImageSource),
      worker(ImagesResource.Sources.DB, [DBDest, [sync_target: Sync2]], id: DBDest),
      worker(ImagesResource.Sources.S3, [Config.get(:images_resource, :dest_bucket),  FullDest, [path: "thumb", strip_prefix: ["thumb"], sync_target: Sync2]], id: FullDest)
    ]

    opts = [strategy: :one_for_one, name: ImagesResource.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
