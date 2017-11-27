use Mix.Config

config :sentry,
  enable_source_code_context: true,
  root_source_code_path: File.cwd!(),
  included_environments: [:prod],
  environment_name: Mix.env()

config :photo_management_api, ecto_repos: [PhotoManagementApi.Repo]

import_config "#{Mix.env()}.exs"
