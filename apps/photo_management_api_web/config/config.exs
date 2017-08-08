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
  pubsub: [name: PhotoManagementApi.Web.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :photo_management_api_web, :generators,
  context_app: :photo_management_api

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "PhotoManagement",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true, # optional
  secret_key: "0NScIueNKpesOHc1YC3T1VkERU6YES3NkhYz4rO0BbXxObhd5HMPeM45CUVpGkF+",
  secret_key: {:system, "GUARDIAN_SECRET_KEY"},
  serializer: PhotoManagementApi.Web.GuardianSerializer

config :wobserver,
  mode: :plug,
  remote_url_prefix: "/wobserver"
