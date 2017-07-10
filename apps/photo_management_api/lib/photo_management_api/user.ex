defmodule PhotoManagementApi.User do
  use Ecto.Schema

  schema "users" do
    field :email, :string
    timestamps()
  end
end
