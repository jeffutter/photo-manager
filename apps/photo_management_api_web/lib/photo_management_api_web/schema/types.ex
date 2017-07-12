defmodule PhotoManagementApi.Web.Schema.Types do
  use Absinthe.Schema.Notation

  alias PhotoManagementApi.Web.Resolver

  object :image do
    field :name, :string
    field :ctime, :string, resolve: &Resolver.Image.ctime/3
    field :size, :string, resolve: &Resolver.Image.size/3
    field :embed, :string
    field :thumbnail, :string
  end

  object :gallery do
    field :name, :string
    field :images, list_of(:image), resolve: &Resolver.Image.all/3
  end
end
