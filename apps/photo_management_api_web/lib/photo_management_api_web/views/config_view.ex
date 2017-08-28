defmodule PhotoManagementApi.Web.ConfigView do
  use PhotoManagementApi.Web, :view

  def render("config.json", %{config: config}) do
    config
  end
end
