defmodule PhotoManagementApi.Rating do
  alias PhotoManagementApi.{Image, Repo, User}

  use PhotoManagementApi.Schema

  schema "ratings" do
    field(:rating, :integer)

    timestamps()

    belongs_to(
      :image,
      Image,
      foreign_key: :slug,
      references: :slug,
      type: :string
    )

    belongs_to(:user, User)
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [
         :rating,
         :slug,
         :user_id
       ])
    |> validate_required([:rating, :slug, :user_id])
    |> validate_changeset
  end

  defp validate_changeset(struct) do
    struct
    |> unique_constraint(:unique_rating, name: :ratings_user_id_slug)
  end

  def rate_image(slug, rating, user_id) do
    {user_id, slug}
    |> find_or_build_rating()
    |> changeset(%{slug: slug, user_id: user_id, rating: rating})
    |> Repo.insert_or_update!()
    |> Repo.preload(:image)
  end

  defp find_or_build_rating({user_id, slug}) do
    Repo.get_by(__MODULE__, user_id: user_id, slug: slug) ||
      %__MODULE__{slug: slug, user_id: user_id}
  end
end
