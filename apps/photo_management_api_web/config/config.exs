# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :photo_management_api_web,
  namespace: PhotoManagementApi.Web,
  ecto_repos: [PhotoManagementApi.Repo]

# Configures the endpoint
config :photo_management_api_web, PhotoManagementApi.Web.Endpoint,
  http: [compress: true],
  url: [host: "localhost"],
  secret_key_base: {:system, "SECRET_KEY_BASE"},
  render_errors: [view: PhotoManagementApi.Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: PhotoManagementApi.Web.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :photo_management_api_web, :generators, context_app: :photo_management_api

config :ueberauth, Ueberauth,
  providers: [
    facebook: {Ueberauth.Strategy.Facebook, []}
  ]

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: {:system, "FACEBOOK_CLIENT_ID"},
  client_secret: {:system, "FACEBOOK_CLIENT_SECRET"}

# optional
# optional
# optional
config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "PhotoManagement",
  ttl: {30, :days},
  allowed_drift: 2000,
  verify_issuer: true,
  secret_key: {:system, "GUARDIAN_SECRET_KEY"},
  serializer: PhotoManagementApi.Web.GuardianSerializer

config :wobserver,
  mode: :plug,
  remote_url_prefix: "/wobserver"

config :sentry,
  public_dsn: {:system, "SENTRY_PUBLIC_DSN"},
  enable_source_code_context: true,
  root_source_code_path: File.cwd!(),
  included_environments: [:prod],
  environment_name: Mix.env()

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
