defmodule PhotoManagementApi.Web.Resolver.Image do
  alias ImagesResource.Storage.{File}
  alias ImagesResource.{Image}

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
