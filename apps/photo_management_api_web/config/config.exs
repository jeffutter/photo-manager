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
  url: [host: "localhost"],
  secret_key_base: "1lOyAmfd2ohnVrcRpr4have/0BSZrDrpTJhlXkWXKFh2eGYVV6cEtrt5ZDoJ2DDz",
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
