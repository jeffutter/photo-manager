defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory

  def all(_parent, args, _info) do
    path = Map.get(args, :path, [])
    {:ok, Gallery.ls(path)}
  end
  def children(%Directory{children: children}, _args, _info) do
    {:ok, children}
  end
end
