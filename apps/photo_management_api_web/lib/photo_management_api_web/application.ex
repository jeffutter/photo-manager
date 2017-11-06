defmodule PhotoManagementApi.Web.Application do
  use Application
  require Prometheus.Registry

  def start(_type, _args) do
    import Supervisor.Spec

    Application.put_env(:ueberauth, Ueberauth.Strategy.Facebook.OAuth, [
      {:client_id, Config.get_sub_key(:ueberauth, Ueberauth.Strategy.Facebook.OAuth, :client_id)},
      {
        :client_secret,
        Config.get_sub_key(:ueberauth, Ueberauth.Strategy.Facebook.OAuth, :client_secret)
      }
    ])

    PhotoManagementApi.Web.Endpoint.PipelineInstrumenter.setup()
    PhotoManagementApi.Web.PhoenixInstrumenter.setup()
    # Prometheus.Registry.register_collector(:prometheus_process_collector)
    PhotoManagementApi.Web.Plug.Exporter.setup()

    children = [
      supervisor(PhotoManagementApi.Web.Endpoint, [])
    ]

    opts = [strategy: :one_for_one, name: PhotoManagementApi.Web.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
