defmodule PhotoManagementApi.ProtectedLinkToken do
  alias PhotoManagementApi.{Repo, User}

  use PhotoManagementApi.Schema

  import Ecto.Query

  schema "protected_link_tokens" do
    field(:token, :string)
    field(:slugs, {:array, :string})

    timestamps()

    belongs_to(:user, User)
  end

  def create(%User{id: user_id}, slugs) do
    token = EntropyString.token()

    params = %{
        token: token,
        user_id: user_id,
        slugs: slugs
    }

    %__MODULE__{}
    |> changeset(params)
    |> Repo.insert()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [
      :token,
      :slugs,
      :user_id
    ])
    |> validate_required([:token, :slugs, :user_id])
    |> validate_changeset
  end

  defp validate_changeset(struct) do
    struct
    |> unique_constraint(:token, name: :protected_link_tokens_token)
  end
end
