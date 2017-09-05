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
      worker(ImagesResource.Sync, [[source: ImageSource, dest: ImageDest]]),
      worker(ImagesResource.Sources.S3, [Config.get(:images_resource, :dest_bucket), ImageDest], id: ImageDest),
      worker(ImagesResource.Sources.S3, [Config.get(:images_resource, :source_bucket), ImageSource], id: ImageSource)
    ]

    opts = [strategy: :one_for_one, name: ImagesResource.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
