defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory

  def all(_parent, args, _info) do
    slug = Map.get(args, :slug)

    find_by_slug(slug)
  end

  defp find_by_slug(slug) do
    case Gallery.find_by_slug(slug) do
      %Directory{name: name, children: children, path: path, slug: slug} ->
        {:ok, %{
            name: name,
            path: path,
            slug: slug,
            children: children,
            total_children: length(children)
         }}
      _ ->
        {:error, "Slug #{slug} not found"}
    end
  end
end
