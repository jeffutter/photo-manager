defmodule PhotoManagementApi.Web.Guardian do
  use Guardian, otp_app: :photo_management_api_web

  alias PhotoManagementApi.Repo
  alias PhotoManagementApi.{User, ProtectedLinkToken}

  def subject_for_token(%User{id: id}, _), do: {:ok, "User:#{id}"}
  def subject_for_token(%ProtectedLinkToken{id: id}, _), do: {:ok, "PL:#{id}"}
  def subject_for_token(_, _), do: {:error, "Unknown resource type"}

  def resource_from_claims(%{"sub" => "User:" <> id}), do: {:ok, Repo.get(User, id)}
  def resource_from_claims(%{"sub" => "PL:" <> id}), do: {:ok, Repo.get(ProtectedLinkToken, id)}
  def resource_from_claims(r), do: {:error, "Unknown resource type: #{inspect(r)}"}
end
