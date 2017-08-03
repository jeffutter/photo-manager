use Mix.Config

config :images_resource,
  source_bucket: {:system, "SOURCE_BUCKET"},
  dest_bucket: {:system, "AWS_S3_BUCKET"}

config :arc,
  storage: Arc.Storage.GCS,
  bucket: {:system, "AWS_S3_BUCKET"},
  asset_host: {:system, "ASSET_HOST"}

config :goth, json: {:system, "GCP_CREDENTIALS"}

config :ex_aws,
  access_key_id: {:system, "AWS_ACCESS_KEY_ID"},
  secret_access_key: {:system, "AWS_SECRET_ACCESS_KEY"},
  region: {:system, "AWS_DEFAULT_REGION"}

import_config "#{Mix.env}.exs"
