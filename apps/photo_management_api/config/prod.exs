use Mix.Config

config :photo_management_api, PhotoManagementApi.Repo,
  adapter: EctoMnesia.Adapter
#  adapter: Ecto.Adapters.Postgres,
#  username: "postgres",
#  password: "postgres",
#  database: "photo_management_api_prod",
#  pool_size: 15
