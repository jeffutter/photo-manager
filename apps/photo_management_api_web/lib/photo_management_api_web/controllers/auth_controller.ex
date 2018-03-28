defmodule PhotoManagementApi.Web.AuthController do
  require Logger

  use PhotoManagementApi.Web, :controller

  plug(Ueberauth)

  alias Ueberauth.Auth
  alias PhotoManagementApi.User
  alias PhotoManagementApi.Web.Guardian

  def callback(conn = %Plug.Conn{assigns: %{ueberauth_failure: fails}}, _params) do
    Logger.error("Uberauth Failed: #{inspect(fails)}")
    conn
  end

  def callback(conn = %Plug.Conn{assigns: %{ueberauth_auth: auth}}, _params) do
    {:ok, user = %User{}} = find_or_create(auth)
    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user, %{}, token_type: :api)

    max_age = full_claims["exp"] - full_claims["iat"]

    conn
    |> put_resp_cookie("access_token", jwt, max_age: max_age, http_only: false)
    |> redirect(to: "/")
  end

  def find_or_create(auth = %Auth{}) do
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
      provider: provider(auth.provider)
    }
  end

  defp provider("facebook"), do: :facebook
  defp provider(:facebook), do: :facebook

  defp provider("google"), do: :google
  defp provider(:google), do: :google

  defp name_from_auth(auth) do
    if auth.info.name do
      auth.info.name
    else
      name =
        [auth.info.first_name, auth.info.last_name]
        |> Enum.filter(&(&1 != nil and &1 != ""))

      case length(name) do
        0 -> auth.info.nickname
        _ -> Enum.join(name, " ")
      end
    end
  end
end
