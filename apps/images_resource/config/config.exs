use Mix.Config

config :images_resource,
  source_bucket: System.get_env("SOURCE_BUCKET"),
  dest_bucket: System.get_env("AWS_S3_BUCKET")

config :arc,
  storage: Arc.Storage.S3,
  bucket: System.get_env("AWS_S3_BUCKET"),
  asset_host: System.get_env("ASSET_HOST")

config :ex_aws,
  access_key_id: System.get_env("AWS_ACCESS_KEY_ID"),
  secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY")
  region: System.get_env("AWS_DEFAULT_REGION")

case System.get_env('AWS_ENDPOINT') do
  nil -> :noop
  uri ->
    %{scheme: scheme, host: host, port: port} = URI.parse(uri)

    config :ex_aws,
      s3: [
        scheme: "http://",
        host: "localhost",
        port: 9000
      ]
end
