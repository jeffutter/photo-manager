defmodule PhotoManagementApi.Image do
  use PhotoManagementApi.Schema

  import EctoEnum, except: [cast: 3]
  import Ecto.Query
  alias PhotoManagementApi.Repo

  defenum(VersionEnum, original: 0, thumb: 1, small: 2, medium: 3, large: 4)

  schema "images" do
    field(:name, :string)
    field(:path, {:array, :string})
    field(:slug, :string)
    field(:size, :integer)
    field(:last_modified, :utc_datetime)
    field(:width, :integer)
    field(:height, :integer)
    field(:base64, :string)
    field(:version, VersionEnum)

    timestamps()

    has_one(:rating, PhotoManagementApi.Rating, foreign_key: :slug, references: :slug)
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [
         :name,
         :path,
         :slug,
         :size,
         :last_modified,
         :width,
         :height,
         :base64,
         :version
       ])
    |> validate_required([:name, :path, :slug, :size, :last_modified, :width, :height, :version])
    |> validate_changeset
  end

  def get_all_by_slugs([], user_id) do
    query =
      from(
        i in __MODULE__,
        limit: 20,
        left_join: r in PhotoManagementApi.Rating,
        on: i.slug == r.slug and r.user_id == ^user_id
      )

    query
    |> preload(:rating)
    |> Repo.all()
  end

  def get_all_by_slugs(slugs, user_id) do
    query =
      from(
        i in __MODULE__,
        where: i.slug in ^slugs,
        left_join: r in PhotoManagementApi.Rating,
        on: i.slug == r.slug and r.user_id == ^user_id
      )

    query
    |> preload(:rating)
    |> Repo.all()
  end

  defp validate_changeset(struct) do
    struct
    |> unique_constraint(:unique_image, name: :images_name_path_slug)
  end
end
