defmodule PhotoManagementApi.Web.Resolver.Image do

  alias ImagesResource.{Gallery,Image}
  alias Absinthe.Resolution.Helpers

  def all(gallery = %Gallery{}, _args, _info) do
    Gallery.ls(gallery)
  end
  def all(_parent, _args, _info) do
    Gallery.ls
  end

  def last_modified(image, _args, _info) do
    {:ok, image.last_modified}
  end

  def size(image, _args, _info) do
    {:ok, image.size}
  end

  def embed(image, _args, _info) do
    Helpers.async(fn ->
      Image.base_64(image, :thumb)
    end)
  end

  def url(image, _args, _info) do
    {:ok, Image.url(image, :large)}
  end
end
