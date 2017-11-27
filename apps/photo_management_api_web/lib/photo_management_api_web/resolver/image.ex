defmodule PhotoManagementApi.Web.Resolver.Image do
  alias ImagesResource.Storage.{File}
  alias ImagesResource.{Image}
  alias PhotoManagementApi.{Rating, User}

  def small_url(file = %File{}, _args, _info) do
    {:ok, Image.url(file, :small)}
  end

  def medium_url(file = %File{}, _args, _info) do
    {:ok, Image.url(file, :medium)}
  end

  def large_url(file = %File{}, _args, _info) do
    {:ok, Image.url(file, :large)}
  end

  def rate_image(%{slug: slug, rating: rating}, %{
        context: %{current_user: %User{id: user_id}}
      }) do
    updated = Rating.rate_image(slug, rating, user_id)

    {:ok, File.from_ecto(updated.image)}
  end
end
