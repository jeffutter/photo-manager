# Import all plugins from `rel/plugins`
# They can then be used by adding `plugin MyPlugin` to
# either an environment, or release definition, where
# `MyPlugin` is the name of the plugin module.
Path.join(["rel", "plugins", "*.exs"])
|> Path.wildcard()
|> Enum.map(&Code.eval_file(&1))

use Mix.Releases.Config,
    # This sets the default release built by `mix release`
    default_release: :default,
    # This sets the default environment used by `mix release`
    default_environment: Mix.env()

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/configuration.html


# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :dev do
  set dev_mode: true
  set include_erts: false
  set cookie: :"di1W@bn);VBLh=v5CKFhrG=@uHkQ3j.h_W@X_)!j~c&Yy=|zSi0cgXVtWc$QZt,r"
end

environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :"F_/e:~nL4<IA*f)h4a|AmG4x7?tpXzN7sM;^_Gy{Y{TwPPB18~{L6Kx2)G^0?D)d"
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix release`, the first release in the file
# will be used by default

release :photo_management do
  set version: "0.1.0"
  set applications: [
    :runtime_tools,
    images_resource: :permanent,
    photo_management_api: :permanent,
    photo_management_api_web: :permanent
  ]
  set commands: [
    "migrate": "rel/commands/migrate.sh",
    "seed": "rel/commands/seed.sh"
  ]
end

