defmodule PhotoManagementApi.Web.Plug.SPA do
  def init([]), do: []

  def call(conn, []) do
    IO.inspect conn.request_path
    if String.match?(conn.request_path, ~r/^\/(?:(?!(api|socket|graphql|graphiql))).*/) do
      IO.inspect conn.request_path
      IO.inspect conn.path_info
      %{conn |
        request_path: "/index.html",
        path_info: ["index.html"]
      }
    else
      conn
    end
  end
end
