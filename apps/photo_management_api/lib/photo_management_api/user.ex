defmodule PhotoManagementApi.User do
  use PhotoManagementApi.Schema

  alias Ecto.Changeset
  alias PhotoManagementApi.Repo
  alias Comeonin.Bcrypt

  import Ecto.Query, only: [from: 2]
  import EctoEnum, except: [cast: 3]

  defenum(ProviderEnum, facebook: 0)

  schema "users" do
    field(:email, :string)
    field(:name, :string)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)
    field(:is_admin, :boolean)
    field(:avatar, :string)
    field(:provider, ProviderEnum)
    field(:provider_id, :string)

    timestamps()

    has_many :ratings, PhotoManagementApi.Rating
  end

  def find_or_create(user) do
    query =
      from(
        u in __MODULE__,
        where: u.provider == ^user.provider,
        where: u.provider_id == ^user.provider_id
      )

    case Repo.one(query) do
      user = %__MODULE__{} -> {:ok, user}
      _ -> Repo.insert(user)
    end
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :name, :password, :is_admin, :avatar, :provider, :provider_id])
    |> validate_required([:email, :name])
    |> validate_changeset
  end

  def registration_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :name, :password])
    |> validate_required([:email, :name, :password])
    |> validate_changeset
  end

  def find_and_confirm_password(email, password) do
    case Repo.get_by(__MODULE__, email: email) do
      nil ->
        {:error, :not_found}

      user ->
        if Bcrypt.checkpw(password, user.password_hash) do
          {:ok, user}
        else
          {:error, :unauthorized}
        end
    end
  end

  defp validate_changeset(struct) do
    struct
    |> validate_length(:email, min: 5, max: 255)
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> validate_length(:password, min: 8)
    |> validate_format(
         :password,
         ~r/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*/,
         message:
           "Must include at least one lowercase letter, one uppercase letter, and one digit"
       )
    |> generate_password_hash
  end

  defp generate_password_hash(changeset) do
    case changeset do
      %Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Bcrypt.hashpwsalt(password))

      _ ->
        changeset
    end
  end
end
