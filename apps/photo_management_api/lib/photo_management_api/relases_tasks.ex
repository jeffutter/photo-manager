defmodule PhotoManagementApi.ReleaseTasks do
  @start_apps [
    :crypto,
    :ssl,
    :postgrex,
    :ecto
  ]

  @myapps [
    :photo_management_api
  ]

  @repos [
    PhotoManagementApi.Repo
  ]

  def migrate do
    startup()

    # Run migrations
    Enum.each(@myapps, &run_migrations_for/1)

    # Signal shutdown
    IO.puts("Success!")
    :init.stop()
  end

  def seed do
    startup()

    # Run migrations
    Enum.each(@myapps, &run_migrations_for/1)

    # Run the seed script if it exists
    seed_script = seed_path(:photo_management_api)

    if File.exists?(seed_script) do
      IO.puts("Running seed script..")
      Code.eval_file(seed_script)
    end

    # Signal shutdown
    IO.puts("Success!")
    :init.stop()
  end

  defp startup do
    IO.puts("Loading myapp..")
    # Load the code for myapp, but don't start it
    :ok = Application.load(:photo_management_api)

    IO.puts("Starting dependencies..")
    # Start apps necessary for executing migrations
    Enum.each(@start_apps, &Application.ensure_all_started/1)

    # Start the Repo(s) for myapp
    IO.puts("Starting repos..")
    Enum.each(@repos, & &1.start_link(pool_size: 1))
  end

  def priv_dir(app), do: "#{:code.priv_dir(app)}"

  defp run_migrations_for(app) do
    IO.puts("Running migrations for #{app}")
    Ecto.Migrator.run(PhotoManagementApi.Repo, migrations_path(app), :up, all: true)
  end

  defp migrations_path(app), do: Path.join([priv_dir(app), "repo", "migrations"])
  defp seed_path(app), do: Path.join([priv_dir(app), "repo", "seeds.exs"])
end
