defmodule PhotoManagementApi.Image do
  alias PhotoManagementApi.{Rating, Repo}

  use PhotoManagementApi.Schema

  import EctoEnum, except: [cast: 3]
  import Ecto.Query

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
    user_id
    |> get_all_by_slugs_query()
    |> limit(20)
    |> Repo.all()
  end

  def get_all_by_slugs(slugs, user_id) do
    user_id
    |> get_all_by_slugs_query()
    |> where([i], i.slug in ^slugs)
    |> Repo.all()
  end

  defp get_all_by_slugs_query(user_id) do
    rating_query =
      from(
        r in Rating,
        where: r.user_id == ^user_id
      )

    from(
      i in __MODULE__,
      left_join: r in Rating,
      on: r.slug == i.slug and r.user_id == ^user_id,
      preload: [rating: ^rating_query]
    )
  end

  defp validate_changeset(struct) do
    struct
    |> unique_constraint(:unique_image, name: :images_name_path_slug_version)
  end
end
