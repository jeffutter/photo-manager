defmodule PhotoManagementApi.Web.ConfigController do
  use PhotoManagementApi.Web, :controller

  def get(conn, _params) do
    config = %{
                sentry_dsn: Config.get(:sentry, :public_dsn)
              }
    render(conn, "config.json", config: config)
  end
end