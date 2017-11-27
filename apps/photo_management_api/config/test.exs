use Mix.Config

config :photo_management_api, PhotoManagementApi.Repo,
  adapter: Ecto.Adapters.Postgres,
  pool: Ecto.Adapters.SQL.Sandbox,
  url: "postgresql://postgres:postgres@localhost:5432/photo_management_test"
