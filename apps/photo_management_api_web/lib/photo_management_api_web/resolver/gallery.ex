defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory

  def all(_parent, args, _info) do
    offset = Map.get(args, :offset, 0)
    slug = Map.get(args, :slug, "root")

    find_by_slug(slug, offset)
  end

  defp find_by_slug(slug, offset) do
    case Gallery.find_by_slug(slug) do
      %Directory{name: name, children: children, path: path, slug: slug} ->
        {:ok, %{
            name: name,
            path: path,
            slug: slug,
            children: Enum.slice(children, offset..(offset+(20-1))),
            total_children: length(children)
         }}
      _ ->
        {:error, "Slug #{slug} not found"}
    end
  end
end
