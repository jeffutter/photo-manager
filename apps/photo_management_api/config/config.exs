use Mix.Config

config :photo_management_api, ecto_repos: [PhotoManagementApi.Repo]

import_config "#{Mix.env}.exs"

config :mnesia,
  dir: to_charlist Path.join(File.cwd!, "priv/data/mnesia")
