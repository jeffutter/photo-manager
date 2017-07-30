defmodule PhotoManagementApi.Web.Schema do
  use Absinthe.Schema

  alias PhotoManagementApi.Web.Resolver

  import_types PhotoManagementApi.Web.Schema.Types

  query do
    field :gallery, :gallery do
      arg :path, list_of(:string)
      resolve &Resolver.Gallery.all/3
    end
  end

  mutation do
  end
end
