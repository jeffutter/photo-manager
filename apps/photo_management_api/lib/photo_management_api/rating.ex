defmodule PhotoManagementApi.Rating do
  use PhotoManagementApi.Schema

  import Ecto.Query
  alias PhotoManagementApi.Repo

  schema "ratings" do
    field(:rating, :integer)

    timestamps()

    belongs_to :image, PhotoManagementApi.Image, foreign_key: :slug, references: :slug, type: :string
    belongs_to :user, PhotoManagementApi.User
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
end
