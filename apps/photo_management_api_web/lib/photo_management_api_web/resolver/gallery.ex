defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory

  def all(_parent, args, _info) do
    page = Map.get(args, :page, 0)
    slug = Map.get(args, :slug, "root")

    find_by_slug(slug, page)
  end

  defp find_by_slug(slug, page) do
    case Gallery.find_by_slug(slug) do
      %Directory{name: name, children: children, path: path, slug: slug} ->
        children = Scrivener.paginate(children, %{page: page, page_size: 20})

        {:ok, %{
            name: name,
            path: path,
            slug: slug,
            children: children.entries,
            page_number: children.page_number,
            page_size: children.page_size,
            total_pages: children.total_pages,
            total_entries: children.total_entries
         }}
      _ ->
        {:error, "Slug #{slug} not found"}
    end
  end
end
