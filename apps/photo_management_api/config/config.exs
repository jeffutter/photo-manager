use Mix.Config

config :photo_management_api, ecto_repos: [PhotoManagementApi.Repo]

config :photo_management_api, PhotoManagementApi.Repo,
  adapter: Ecto.Adapters.Postgres,
  pool_size: 15