defmodule PhotoManagementApi.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use PhotoManagementApi.Web, :controller
      use PhotoManagementApi.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: PhotoManagementApi.Web
      import Plug.Conn
      import PhotoManagementApi.Web.Router.Helpers
      import PhotoManagementApi.Web.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View,
        root: "lib/photo_management_api_web/templates",
        namespace: PhotoManagementApi.Web

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      import PhotoManagementApi.Web.Router.Helpers
      import PhotoManagementApi.Web.ErrorHelpers
      import PhotoManagementApi.Web.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import PhotoManagementApi.Web.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
