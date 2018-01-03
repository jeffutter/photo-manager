defmodule PhotoManagementApi.Web.Plug.SPA do
  def init([]), do: []

  def call(conn, []) do
    if String.match?(
         conn.request_path,
         ~r/^\/(?:(?!(__auth|api|auth|config|socket|graphql|graphiql|metrics|wobserver))).*/
       ) do
      %{conn | request_path: "/index.html", path_info: ["index.html"]}
    else
      conn
    end
  end
end
