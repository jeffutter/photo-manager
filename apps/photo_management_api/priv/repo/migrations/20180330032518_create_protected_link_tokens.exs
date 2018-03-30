defmodule PhotoManagementApi.Repo.Migrations.CreateProtectedLinkTokens do
  use Ecto.Migration

  def change do
    create table(:protected_link_tokens) do
      add(:token, :string)
      add(:slugs, {:array, :string})
      add(:user_id, :integer)

      timestamps()
    end

    create(unique_index(:protected_link_tokens, :token, name: :protected_link_tokens_token))
    create(index(:protected_link_tokens, :user_id, name: :protected_link_tokens_user_id))
  end
end
