defmodule PhotoManagementApi.Web.Guardian.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, reason}, _opts) do
    body = Poison.encode!(%{message: "#{inspect(type)}: #{inspect(reason)}"})
    send_resp(conn, 401, body)
  end
end
