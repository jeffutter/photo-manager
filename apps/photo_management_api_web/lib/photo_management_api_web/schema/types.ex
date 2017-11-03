defmodule PhotoManagementApi.Web.Schema.Types do
  require Logger

  use Absinthe.Schema.Notation

  alias PhotoManagementApi.Web.Resolver

  alias ImagesResource.Storage.{File, Directory}
  alias PhotoManagementApi.Image, as: DBImage

  union :descendants do
    description("A child of a directory")

    types([:image, :gallery])

    resolve_type(fn
      %File{}, _ -> :image
      %Directory{}, _ -> :gallery
    end)
  end

  object :image do
    field(:id, :string, resolve: fn %{slug: slug}, _, _ -> {:ok, slug} end)
    field(:name, :string)
    field(:path, list_of(:string))
    field(:slug, :string)
    field(:last_modified, :string, resolve: from_db(:last_modified))
    field(:size, :string, resolve: from_db(:size))
    field(:width, :integer, resolve: from_db(:width))
    field(:height, :integer, resolve: from_db(:height))
    field(:thumbnail, :integer, resolve: from_db(:base64))
    field(:small_url, :string, resolve: &Resolver.Image.small_url/3)
    field(:medium_url, :string, resolve: &Resolver.Image.medium_url/3)
    field(:large_url, :string, resolve: &Resolver.Image.large_url/3)
  end

  object :gallery do
    field(:id, :string, resolve: fn %{slug: slug}, _, _ -> {:ok, slug} end)
    field(:name, :string)
    field(:path, list_of(:string))
    field(:slug, :string)
    field(:total_descendants, :integer, resolve: fn %{total_children: tc}, _, _ -> {:ok, tc} end)

    field :descendants, list_of(:descendants) do
      arg(:slugs, list_of(:string))

      resolve(fn %{children: children}, args, _ ->
        slugs = Map.get(args, :slugs)

        case slugs do
          [] ->
            {:ok, Enum.slice(children, 0..20)}

          slugs when is_list(slugs) ->
            matching_children =
              children
              |> Enum.filter(fn child ->
                   Enum.member?(slugs, child.slug)
                 end)

            {:ok, matching_children}

          _ ->
            {:ok, children}
        end
      end)
    end
  end

  defp from_db(field) do
    fn file = %File{}, _, _ ->
      batch({__MODULE__, :images_from_db}, file, fn batch_results ->
        with image when not is_nil(image) <- Map.get(batch_results, file),
             value <- Map.get(image, field) do
          {:ok, value}
        else
          _ ->
            Logger.error("Data missing from DB. Field: #{field} for #{file.slug}")
            {:error, "Data missing from DB. Field: #{field} for #{file.slug}"}
        end
      end)
    end
  end

  def images_from_db(_, files) do
    files
    |> Enum.map(fn file -> Map.get(file, :slug) end)
    |> DBImage.get_all_by_slugs()
    |> Enum.map(fn image ->
         file = Enum.find(files, fn f -> f.slug == image.slug end)
         {file, image}
       end)
    |> Enum.into(%{})
  end
end
