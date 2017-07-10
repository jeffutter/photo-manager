defmodule PhotoManagementApi.Application do
  @moduledoc """
  The PhotoManagementApi Application Service.

  The photo_management_api system business domain lives in this application.

  Exposes API to clients such as the `PhotoManagementApi.Web` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Supervisor.start_link([
      supervisor(PhotoManagementApi.Repo, []),
    ], strategy: :one_for_one, name: PhotoManagementApi.Supervisor)
  end
end
