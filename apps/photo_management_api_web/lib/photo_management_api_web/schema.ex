defmodule PhotoManagementApi.Web.Schema do
  use Absinthe.Schema

  alias PhotoManagementApi.Web.Resolver

  import_types PhotoManagementApi.Web.Schema.Types

  query do
    field :images, list_of(:image) do
      resolve &Resolver.Image.all/3
    end

    field :galleries, list_of(:gallery) do
      resolve &Resolver.Gallery.all/3
    end
  end

  mutation do
  end
end
