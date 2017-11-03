defmodule PhotoManagementApi.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images) do
      add(:name, :string)
      add(:path, {:array, :string})
      add(:slug, :string)
      add(:size, :integer)
      add(:last_modified, :utc_datetime)
      add(:width, :integer)
      add(:height, :integer)
      add(:base64, :text)
      add(:version, :integer)

      timestamps()
    end

    create(index(:images, [:slug]))

    create(
      unique_index(:images, [:name, :path, :slug, :version], name: :images_name_path_slug_version)
    )
  end
end
