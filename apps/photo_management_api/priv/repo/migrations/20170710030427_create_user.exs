defmodule PhotoManagementApi.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :id, :integer
      add :email, :string

      timestamps()
    end
  end
end
