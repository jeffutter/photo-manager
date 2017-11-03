defmodule PhotoManagementApi.Web.Endpoint do
  use Phoenix.Endpoint, otp_app: :photo_management_api_web

  socket("/socket", PhotoManagementApi.Web.UserSocket)
  socket("/wobserver", Wobserver.Web.PhoenixSocket)

  # , origin: "http://localhost:4000"
  plug(CORSPlug)

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug(
    Plug.Static,
    at: "/",
    from: :photo_management_api_web,
    gzip: true,
    brotli: true,
    cache_control_for_etags: "public, max-age=31536000"
  )

  plug(PhotoManagementApi.Web.Plug.SPA)

  plug(
    Plug.Static,
    at: "/",
    from: :photo_management_api_web,
    gzip: true,
    brotli: true,
    cache_control_for_etags: "public, max-age=31536000",
    only: ["index.html"]
  )

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug(Phoenix.CodeReloader)
  end

  plug(Plug.RequestId)
  plug(Plug.Logger)

  plug(
    Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug(
    Plug.Session,
    store: :cookie,
    key: "_photo_management_api_web_key",
    signing_salt: "G8rEUovD"
  )

  plug(PhotoManagementApi.Web.Router)

  @doc """
  Dynamically loads configuration from the system environment
  on startup.

  It receives the endpoint configuration from the config files
  and must return the updated configuration.
  """
  def load_from_system_env(config) do
    port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
    {:ok, Keyword.put(config, :http, [:inet6, port: port])}
  end
end
