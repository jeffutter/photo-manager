defmodule PhotoManagementApi.Web.Schema do
  use Absinthe.Schema

  alias PhotoManagementApi.Web.Resolver

  import_types(PhotoManagementApi.Web.Schema.Types)

  query do
    field :gallery, :gallery do
      arg(:slug, :string, default_value: "root")

      resolve(&Resolver.Gallery.all/3)
    end
  end

  mutation do
    field :rate_image, type: :image do
      arg :slug, non_null(:string)
      arg :rating, non_null(:integer)

      resolve(&Resolver.Image.rate_image/2)
    end
  end
end
