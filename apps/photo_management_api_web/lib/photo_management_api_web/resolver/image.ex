defmodule PhotoManagementApi.Web.Resolver.Image do

  alias ImagesResource.{Gallery,Image}
  alias Absinthe.Resolution.Helpers

  def all(%Gallery{name: name}, _args, _info) do
    {:ok, Gallery.ls(name)}
  end
  def all(_parent, _args, _info) do
    {:ok, Gallery.ls}
  end

  def ctime(image, _args, _info) do
    Helpers.batch({__MODULE__, :file_data}, image, fn path_data ->
      {:ok, path_data[image].ctime}
    end)
  end

  def size(image, _args, _info) do
    Helpers.batch({__MODULE__, :file_data}, image, fn path_data ->
      {:ok, path_data[image].size}
    end)
  end

  def embed(image, _args, _info) do
    Helpers.async(fn ->
      Image.base_64(image, :thumb)
    end)
  end

  def url(image, _args, _info) do
    {:ok, Image.url(image, :original)}
  end

  def file_data(_, files) do
    for file <- files, into: %{} do
      {:ok, file_stats} = ImagesResource.Image.stat(file)
      {file, file_stats}
    end
  end
end
