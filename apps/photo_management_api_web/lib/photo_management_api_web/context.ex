defmodule PhotoManagementApi.Web.Context do
  @moduledoc """
  This module is just a regular plug that can look at the conn struct and build
  the appropriate absinthe context.
  """

  @behaviour Plug
  import Plug.Conn

  alias Guardian.Plug
  alias PhotoManagementApi.{ProtectedLinkToken, User}

  def init(opts), do: opts

  def call(conn, _) do
    case build_context(conn) do
      {:ok, context} ->
        put_private(conn, :absinthe, %{context: context})

      {:error, code, reason} ->
        conn
        |> send_resp(code, reason)
        |> halt()

      _ ->
        conn
        |> send_resp(400, "Bad Request")
        |> halt()
    end
  end

  def build_context(conn) do
    case Plug.current_resource(conn) do
      nil ->
        {:error, 401, "invalid authorization token"}

      user = %User{} ->
        {:ok, %{current_user: user}}

      protected_link_token = %ProtectedLinkToken{} ->
        {:ok, %{protected_link_token: protected_link_token}}
    end
  end
end
