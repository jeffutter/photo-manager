defmodule PhotoManagementApi.ReleaseTasks do
  @start_apps [
    :crypto,
    :ssl,
    :mnesia,
    :ecto,
    :ecto_mnesia
  ]
  
  @myapps [
    :photo_management_api
  ]

  @repos [
    PhotoManagementApi.Repo
  ]

  def seed do
    IO.puts "Loading myapp.."
    # Load the code for myapp, but don't start it
    :ok = Application.load(:photo_management_api)

    IO.puts "Starting dependencies.."
    # Start apps necessary for executing migrations
    Enum.each(@start_apps, &Application.ensure_all_started/1)

    Enum.each(@repos, &create_repo/1)

    # Start the Repo(s) for myapp
    IO.puts "Starting repos.."
    Enum.each(@repos, &(&1.start_link(pool_size: 1)))

    # Run migrations
    Enum.each(@myapps, &run_migrations_for/1)

    # Run the seed script if it exists
    seed_script = seed_path(:photo_management_api)
    if File.exists?(seed_script) do
      IO.puts "Running seed script.."
      Code.eval_file(seed_script)
    end

    # Signal shutdown
    IO.puts "Success!"
    :init.stop()
  end

  def priv_dir(app), do: "#{:code.priv_dir(app)}"

  defp create_repo(repo) do
    case repo.__adapter__.storage_up(repo.config) do
      :ok ->
        IO.puts "The database for #{inspect repo} has been created"
      {:error, :already_up} ->
        IO.puts "The database for #{inspect repo} has already been created"
      {:error, term} when is_binary(term) ->
        raise "The database for #{inspect repo} couldn't be created: #{term}"
      {:error, term} ->
        raise "The database for #{inspect repo} couldn't be created: #{inspect term}"
    end   
  end

  defp run_migrations_for(app) do
    IO.puts "Running migrations for #{app}"
    Ecto.Migrator.run(PhotoManagementApi.Repo, migrations_path(app), :up, all: true)
  end

  defp migrations_path(app), do: Path.join([priv_dir(app), "repo", "migrations"])
  defp seed_path(app), do: Path.join([priv_dir(app), "repo", "seeds.exs"])
end