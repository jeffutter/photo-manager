defmodule ImagesResource.Mixfile do
  use Mix.Project

  def project do
    [
      app: :images_resource,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.4",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    # Specify extra applications you'll use from Erlang/Elixir
    [extra_applications: [:logger], mod: {ImagesResource.Application, []}]
  end

  # Dependencies can be Hex packages:
  #
  #   {:my_dep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:my_dep, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
  #
  # To depend on another app inside the umbrella:
  #
  #   {:my_app, in_umbrella: true}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:config, in_umbrella: true},
      {:photo_management_api, in_umbrella: true},
      {:sentry, github: "getsentry/sentry-elixir"},
      gen_stage: "~> 0.12.1",
      job_queue: "~> 0.1.0",
      ex_aws: "~> 1.1",
      fastimage: "~> 0.0.7",
      hackney: "~> 1.6",
      mime: "~> 1.1.0",
      poison: "~> 3.1",
      sweet_xml: "~> 0.6",
      flow: "~> 0.11"
    ]
  end
end
