defmodule PhotoManagementApi.Web.AuthController do
  require Logger

  use PhotoManagementApi.Web, :controller

  plug Ueberauth

  alias Ueberauth.Auth
  alias PhotoManagementApi.User

  def callback(%Plug.Conn{assigns: %{ueberauth_failure: fails}} = conn, _params) do
    Logger.error "Uberauth Failed: #{inspect fails}"
    conn
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    {:ok, user = %User{}} = find_or_create(auth)
    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user, :api)

    max_age = full_claims["exp"] - full_claims["iat"]

    conn
    |> put_resp_cookie("access_token", jwt, max_age: max_age, http_only: false)
    |> redirect(to: "/")
  end

  def find_or_create(%Auth{} = auth) do
    auth
    |> basic_info()
    |> User.find_or_create()
  end

  defp basic_info(auth) do
    %User{
      provider_id: auth.uid,
      name: name_from_auth(auth),
      avatar: auth.info.image,
      email: auth.info.email,
      provider: :facebook
    }
  end

  defp name_from_auth(auth) do
    if auth.info.name do
      auth.info.name
    else
      name = [auth.info.first_name, auth.info.last_name]
             |> Enum.filter(&(&1 != nil and &1 != ""))

      cond do
        length(name) == 0 -> auth.info.nickname
        true -> Enum.join(name, " ")
      end
    end
  end
end