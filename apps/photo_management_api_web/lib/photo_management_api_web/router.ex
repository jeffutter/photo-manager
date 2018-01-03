defmodule PhotoManagementApi.Web.Router do
  use PhotoManagementApi.Web, :router
  use Plug.ErrorHandler
  use Sentry.Plug

  pipeline :graphql do
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource)
    # plug Guardian.Plug.EnsureAuthenticated
    plug(PhotoManagementApi.Web.Context)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", PhotoManagementApi.Web do
    pipe_through(:api)

    post("/sign_in", SessionController, :sign_in)
  end

  scope "/config", PhotoManagementApi.Web do
    pipe_through(:api)
    get("/", ConfigController, :get)
  end

  scope "/auth", PhotoManagementApi.Web do
    get("/:provider", AuthController, :request)
    get("/:provider/callback", AuthController, :callback)
  end

  scope "/__auth", PhotoManagementApi.Web do
    get("/:provider", AuthController, :request)
    get("/:provider/callback", AuthController, :callback)
  end

  scope "/" do
    pipe_through(:graphql)

    get("/graphiql", Absinthe.Plug.GraphiQL, schema: PhotoManagementApi.Web.Schema)
    post("/graphiql", Absinthe.Plug.GraphiQL, schema: PhotoManagementApi.Web.Schema)
    forward("/graphql", Absinthe.Plug, schema: PhotoManagementApi.Web.Schema)
  end

  scope "/wobserver" do
    forward("/", Wobserver.Web.Router)
  end
end
