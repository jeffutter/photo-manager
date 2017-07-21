defmodule PhotoManagementApi.Web.Schema.Types do
  use Absinthe.Schema.Notation

  alias PhotoManagementApi.Web.Resolver

  object :image do
    field :name, :string
    field :last_modified, :string, resolve: &Resolver.Image.last_modified/3
    field :size, :string, resolve: &Resolver.Image.size/3
    field :thumbnail, :string, resolve: &Resolver.Image.thumbnail/3
    field :small_url, :string, resolve: &Resolver.Image.small_url/3
    field :medium_url, :string, resolve: &Resolver.Image.medium_url/3
    field :large_url, :string, resolve: &Resolver.Image.large_url/3
  end

  object :gallery do
    field :name, :string
    field :images, list_of(:image), resolve: &Resolver.Image.all/3
  end
end
