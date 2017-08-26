defmodule PhotoManagementApi.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :password_hash, :string
      add :is_admin, :boolean
      add :avatar, :string
      add :provider, :integer 
      add :provider_id, :string

      timestamps()
    end
  end
end
