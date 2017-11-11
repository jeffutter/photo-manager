defmodule ImagesResource.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    case System.get_env("AWS_ENDPOINT") do
      nil ->
        :noop

      uri ->
        %{scheme: scheme, host: host, port: port} = URI.parse(uri)

        Application.put_env(
          :ex_aws,
          :s3,
          scheme: scheme,
          host: host,
          port: port
        )
    end

    source_bucket = Config.get(:images_resource, :source_bucket)
    dest_bucket = Config.get(:images_resource, :dest_bucket)

    import Supervisor.Spec, warn: false

    children = [
      worker(ImagesResource.Queue, [S3Queue], id: S3Queue),
      worker(ImagesResource.Queue, [DatabaseQueue], id: DatabaseQueue),
      worker(
        ImagesResource.Processor,
        [S3Queue, ImagesResource.Uploaders.Worker],
        id: S3Processor
      ),
      worker(
        ImagesResource.Processor,
        [DatabaseQueue, ImagesResource.DBQueue.Worker],
        id: DatabaseWorker
      ),
      worker(
        ImagesResource.Sync,
        [[source: ImageSource, dest: ImageDest, name: Sync1]],
        id: Sync1
      ),
      worker(ImagesResource.SyncDB, [[source: FullDest, dest: DBDest, name: Sync2]], id: Sync2),
      worker(
        ImagesResource.Sources.S3,
        [
          ImageDest,
          [
            bucket_name: dest_bucket,
            path: "original",
            strip_prefix: ["original"],
            sync_targets: [Sync1]
          ]
        ],
        id: ImageDest
      ),
      worker(
        ImagesResource.Sources.S3,
        [ImageSource, [bucket_name: source_bucket, sync_targets: [Sync1]]],
        id: ImageSource
      ),
      worker(ImagesResource.Sources.DB, [DBDest, [sync_targets: [Sync2]]], id: DBDest),
      worker(
        ImagesResource.Sources.S3,
        [
          FullDest,
          [
            bucket_name: dest_bucket,
            path: "thumb",
            strip_prefix: ["thumb"],
            sync_targets: [Sync2]
          ]
        ],
        id: FullDest
      )
    ]

    opts = [strategy: :one_for_one, name: ImagesResource.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
