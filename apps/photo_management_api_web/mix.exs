defmodule PhotoManagementApi.Web.Mixfile do
  use Mix.Project

  def project do
    [
      app: :photo_management_api_web,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {PhotoManagementApi.Web.Application, []}, extra_applications: [:logger, :runtime_tools]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:ueberauth, "~> 0.4"},
      {:ueberauth_facebook, "~> 0.6"},
      {:prometheus_plugs, "~> 1.1.4"},
      {:prometheus_phoenix, "~> 1.2.0"},
      {:phoenix, "~> 1.3.0", override: true},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:gettext, "~> 0.11"},
      {:photo_management_api, in_umbrella: true},
      {:images_resource, in_umbrella: true},
      {:config, in_umbrella: true},
      {:guardian, "~> 0.14"},
      {:absinthe, "~> 1.3.2"},
      {:absinthe_plug, "~> 1.3.1"},
      {:cowboy, "~> 1.0"},
      {:cors_plug, "~> 1.2"},
      {:wobserver, "~> 0.1"},
      {:sentry, github: "getsentry/sentry-elixir"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, we extend the test task to create and migrate the database.
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [test: ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
