defmodule PhotoManagementApi.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :id, :integer
      add :name, :string
      add :email, :string
      add :password_hash, :string
      add :is_admin, :boolean

      timestamps()
    end
  end
end
