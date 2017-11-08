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

  def rate_image(%{slug: slug, rating: rating}, %{
        context: %{current_user: %PhotoManagementApi.User{id: user_id}}
      }) do
    r =
      {user_id, slug}
      |> find_or_create_rating

    updated =
      PhotoManagementApi.Rating.changeset(r, %{slug: slug, user_id: user_id, rating: rating})
      |> PhotoManagementApi.Repo.insert_or_update!()
      |> PhotoManagementApi.Repo.preload(:image)

    {:ok, ImagesResource.Storage.File.from_ecto(updated.image)}
  end

  def find_or_create_rating({user_id, slug}) do
    PhotoManagementApi.Repo.get_by(PhotoManagementApi.Rating, user_id: user_id, slug: slug) ||
      %PhotoManagementApi.Rating{slug: slug, user_id: user_id}
  end
end
