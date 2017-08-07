defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory

  def all(_parent, args, _info) do
    path = Map.get(args, :path, [])
    page = Map.get(args, :page, 0)

    case Gallery.ls(path) do
      %Directory{name: name, children: children, path: path} ->
        children = Scrivener.paginate(children, %{page: page, page_size: 20})

        {:ok, %{
            name: name,
            path: path,
            children: children.entries,
            page_number: children.page_number,
            page_size: children.page_size,
            total_pages: children.total_pages,
            total_entries: children.total_entries
         }}
      _ ->
        {:error, "Directory #{path} not found"}
    end

  end
end
