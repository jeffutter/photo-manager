defmodule PhotoManagementApi.Web.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    Application.put_env(:ueberauth, Ueberauth.Strategy.Facebook.OAuth, [
      {:client_id, Config.get_sub_key(:ueberauth, Ueberauth.Strategy.Facebook.OAuth, :client_id)},
      {:client_secret, Config.get_sub_key(:ueberauth, Ueberauth.Strategy.Facebook.OAuth, :client_secret)}
    ])

    children = [
      supervisor(PhotoManagementApi.Web.Endpoint, []),
    ]

    opts = [strategy: :one_for_one, name: PhotoManagementApi.Web.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
