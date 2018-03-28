defmodule PhotoManagementApi.Web.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :photo_management_api_web,
    module: PhotoManagementApi.Web.Guardian,
    error_handler: PhotoManagementApi.Web.Guardian.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
  plug(Guardian.Plug.LoadResource)
  # plug Guardian.Plug.EnsureAuthenticated
end
