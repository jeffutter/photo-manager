defmodule PhotoManagementApi.Web.Schema do
  use Absinthe.Schema

  alias PhotoManagementApi.Web.Resolver

  import_types PhotoManagementApi.Web.Schema.Types

  query do
    field :gallery, :gallery do
      arg :slug, :string, default_value: "root"
      arg :offset, :integer, default_value: 0
      arg :limit, :integer, default_value: 20

      resolve &Resolver.Gallery.all/3
    end
  end

  mutation do
  end
end
