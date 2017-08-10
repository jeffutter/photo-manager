defmodule PhotoManagementApi.Web.Resolver.Image do

  alias ImagesResource.Storage.{File}
  alias ImagesResource.{Image}
  alias Absinthe.Resolution.Helpers

  def last_modified(%File{last_modified: last_modified}, _args, _info) do
    {:ok, last_modified}
  end

  def size(%File{size: size}, _args, _info) do
    {:ok, size}
  end

  def thumbnail(file = %File{}, _args, _info) do
    Helpers.async(fn ->
      Image.base_64(file, :thumb)
    end)
  end

  def small_url(file = %File{}, _args, _info) do
    {:ok, Image.url(file, :small)}
  end
  def medium_url(file = %File{}, _args, _info) do
    {:ok, Image.url(file, :medium)}
  end
  def large_url(file = %File{}, _args, _info) do
    {:ok, Image.url(file, :large)}
  end
end