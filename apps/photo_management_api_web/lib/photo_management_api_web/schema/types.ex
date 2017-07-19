defmodule PhotoManagementApi.Web.Schema.Types do
  use Absinthe.Schema.Notation

  alias PhotoManagementApi.Web.Resolver

  object :image do
    field :name, :string
    field :last_modified, :string, resolve: &Resolver.Image.last_modified/3
    field :size, :string, resolve: &Resolver.Image.size/3
    field :embed, :string, resolve: &Resolver.Image.embed/3
    field :url, :string, resolve: &Resolver.Image.url/3
  end

  object :gallery do
    field :name, :string
    field :images, list_of(:image), resolve: &Resolver.Image.all/3
  end
end
