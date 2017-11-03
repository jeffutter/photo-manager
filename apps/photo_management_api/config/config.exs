use Mix.Config

config :photo_management_api, ecto_repos: [PhotoManagementApi.Repo]

config :photo_management_api, PhotoManagementApi.Repo,
  adapter: Ecto.Adapters.Postgres,
  pool_size: 15

config :sentry,
  enable_source_code_context: true,
  root_source_code_path: File.cwd!(),
  included_environments: [:prod],
  environment_name: Mix.env()
