defmodule PhotoManagementApi.Web.Schema.Types do
  use Absinthe.Schema.Notation

  alias PhotoManagementApi.Web.Resolver

  alias ImagesResource.Storage.{File, Directory}
  alias ImagesResource.Image

  union :descendants do
    description "A child of a directory"

    types [:image, :gallery]
    resolve_type fn
      %File{}, _ -> :image
      %Directory{}, _ -> :gallery
    end
  end

  object :image do
    field :id, :string, resolve: fn %{slug: slug}, _, _ -> {:ok, slug} end;
    field :name, :string
    field :path, list_of(:string)
    field :slug, :string
    field :last_modified, :string, resolve: &Resolver.Image.last_modified/3
    field :size, :string, resolve: &Resolver.Image.size/3
    field :width, :integer, resolve: file_dimension(:width)
    field :height, :integer, resolve: file_dimension(:height)
    field :thumbnail, :string, resolve: &Resolver.Image.thumbnail/3
    field :small_url, :string, resolve: &Resolver.Image.small_url/3
    field :medium_url, :string, resolve: &Resolver.Image.medium_url/3
    field :large_url, :string, resolve: &Resolver.Image.large_url/3
  end

  object :gallery do
    field :id, :string, resolve: fn %{slug: slug}, _, _ -> {:ok, slug} end;
    field :name, :string
    field :path, list_of(:string)
    field :slug, :string
    field :total_descendants, :integer, resolve: fn %{total_children: tc}, _, _ -> {:ok, tc} end
    field :descendants, list_of(:descendants) do
      arg :slugs, list_of(:string)

      resolve fn %{children: children}, args, _ ->
        slugs = Map.get(args, :slugs)

        case slugs do
          [] ->
            {:ok, Enum.slice(children, 0..20)}
          slugs when is_list(slugs) ->
            matching_children = children
                                |> Enum.filter(fn child ->
                                  Enum.member?(slugs, child.slug)
                                end)
            {:ok, matching_children}
          _ ->
            {:ok, children}
        end

      end
    end
  end

  defp file_dimension(dimension) do
    fn file = %File{}, _, _ ->
      batch({__MODULE__, :size_by_file}, file, fn batch_results ->
        dimension = batch_results
                    |> Map.get(file)
                    |> Map.get(dimension)

        {:ok, dimension}
      end)
    end
  end

  def size_by_file(_, files) do
    Image.sizes(files, :original)
  end
end
