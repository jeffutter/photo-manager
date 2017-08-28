defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory

  def all(parent, args, info) do
    offset = Map.get(args, :offset)
    slug = Map.get(args, :slug)
    limit = Map.get(args, :limit)

    find_by_slug(slug, offset, limit)
  end

  defp find_by_slug(slug, offset, limit) do
    case Gallery.find_by_slug(slug) do
      %Directory{name: name, children: children, path: path, slug: slug} ->
        {:ok, %{
            name: name,
            path: path,
            slug: slug,
            children: Enum.slice(children, offset..(offset+(limit-1))),
            total_children: length(children)
         }}
      _ ->
        {:error, "Slug #{slug} not found"}
    end
  end
end
