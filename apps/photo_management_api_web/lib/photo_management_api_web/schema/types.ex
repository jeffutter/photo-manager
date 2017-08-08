defmodule PhotoManagementApi.Web.Schema.Types do
  use Absinthe.Schema.Notation

  alias PhotoManagementApi.Web.Resolver

  alias ImagesResource.Storage.{File, Directory}

  union :descendants do
    description "A child of a directory"

    types [:image, :gallery]
    resolve_type fn
      %File{}, _ -> :image
      %Directory{}, _ -> :gallery
    end
  end

  object :image do
    field :name, :string
    field :path, list_of(:string)
    field :last_modified, :string, resolve: &Resolver.Image.last_modified/3
    field :size, :string, resolve: &Resolver.Image.size/3
    field :thumbnail, :string, resolve: &Resolver.Image.thumbnail/3
    field :small_url, :string, resolve: &Resolver.Image.small_url/3
    field :medium_url, :string, resolve: &Resolver.Image.medium_url/3
    field :large_url, :string, resolve: &Resolver.Image.large_url/3
  end

  object :gallery do
    field :name, :string
    field :path, list_of(:string)
    field :page_number, :integer
    field :page_size, :integer
    field :total_pages, :integer
    field :total_entries, :integer
    field :descendants, list_of(:descendants), resolve: fn %{children: children}, _, _ -> {:ok, children} end
  end
end
