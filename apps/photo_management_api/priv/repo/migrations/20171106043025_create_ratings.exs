defmodule PhotoManagementApi.Repo.Migrations.CreateRatings do
  use Ecto.Migration

  def change do
    create table(:ratings) do
      add(:slug, :string)
      add(:user_id, :integer)
      add(:rating, :integer)

      timestamps()
    end

    create(unique_index(:ratings, [:user_id, :slug], name: :ratings_user_id_slug))
  end
end
