defmodule PhotoManagementApi.Web.Router do
  use PhotoManagementApi.Web, :router

  pipeline :graphql do
    plug PhotoManagementApi.Web.Context
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PhotoManagementApi.Web do
    pipe_through :api
  end

  scope "/" do
    pipe_through :graphql

    get "/graphiql", Absinthe.Plug.GraphiQL, schema: PhotoManagementApi.Web.Schema
    post "/graphiql", Absinthe.Plug.GraphiQL, schema: PhotoManagementApi.Web.Schema
    forward "/graphql", Absinthe.Plug, schema: PhotoManagementApi.Web.Schema
  end
end
