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

  def thumbnail(image, _args, _info) do
    Helpers.async(fn ->
      Image.base_64(image, :thumb)
    end)
  end

  def small_url(image, _args, _info) do
    {:ok, Image.url(image, :small)}
  end
  def medium_url(image, _args, _info) do
    {:ok, Image.url(image, :medium)}
  end
  def large_url(image, _args, _info) do
    {:ok, Image.url(image, :large)}
  end
end
