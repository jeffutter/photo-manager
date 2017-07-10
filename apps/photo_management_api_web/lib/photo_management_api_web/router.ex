defmodule PhotoManagementApi.Web.Router do
  use PhotoManagementApi.Web, :router

  pipeline :graphql do
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
    plug Guardian.Plug.EnsureAuthenticated
    plug PhotoManagementApi.Web.Context
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PhotoManagementApi.Web do
    pipe_through :api

    post "/sign_in", SessionController, :sign_in
  end

  scope "/" do
    pipe_through :graphql

    get "/graphiql", Absinthe.Plug.GraphiQL, schema: PhotoManagementApi.Web.Schema
    post "/graphiql", Absinthe.Plug.GraphiQL, schema: PhotoManagementApi.Web.Schema
    forward "/graphql", Absinthe.Plug, schema: PhotoManagementApi.Web.Schema
  end
end
