defmodule PhotoManagementApi.Web.Guardian do
  use Guardian, otp_app: :photo_management_api_web

  alias PhotoManagementApi.Repo
  alias PhotoManagementApi.{User, ProtectedLinkToken}

  def subject_for_token(user = %User{}, _), do: {:ok, "User:#{user.id}"}
  def subject_for_token(%ProtectedLinkToken{slugs: slugs}, _) do
    claim = Enum.join(slugs, "|")

    {:ok, "PL:#{claim}"}
  end
  def subject_for_token(_, _), do: {:error, "Unknown resource type"}

  def resource_from_claims(%{"sub" => "User:" <> id}), do: {:ok, Repo.get(User, id)}
  def resource_from_claims(%{"sub" => "PL:" <> claim}) do
    slugs =
      claim
      |> String.split("|")

    {:ok, slugs}
  end
  def resource_from_claims(r), do: {:error, "Unknown resource type: #{inspect(r)}"}
end
