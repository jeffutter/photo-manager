defmodule PhotoManagementApi.Web.Context do
  @moduledoc """
  This module is just a regular plug that can look at the conn struct and build
  the appropriate absinthe context.
  """

  @behaviour Plug
  import Plug.Conn

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
    case Guardian.Plug.current_resource(conn) do
      nil ->
        {:error, 401, "invalid authorization token"}

      user ->
        {:ok, %{current_user: user}}
    end
  end
end
