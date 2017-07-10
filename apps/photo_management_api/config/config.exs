use Mix.Config

config :photo_management_api, ecto_repos: [PhotoManagementApi.Repo]

import_config "#{Mix.env}.exs"
