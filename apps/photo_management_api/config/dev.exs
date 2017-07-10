use Mix.Config

# Configure your database
config :photo_management_api, PhotoManagementApi.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "photo_management_api_dev",
  hostname: "localhost",
  pool_size: 10
