defmodule PhotoManagementApi.ImageTest do
  use ExUnit.Case

  alias PhotoManagementApi.{Image, Rating, Repo, User}

  setup do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end

  test "get all by slugs returns only ratings for user" do
    default_params = %{
      name: "name1",
      path: [],
      slug: "name1",
      size: 200,
      last_modified: DateTime.utc_now(),
      width: 100,
      height: 100,
      base64: "base64",
      version: 0
    }

    {:ok, image} =
      %Image{}
      |> Image.changeset(default_params)
      |> Repo.insert()

    {:ok, user1} =
      %User{}
      |> User.registration_changeset(%{
           email: "fake1@email.com",
           name: "Name1",
           password: "Password1"
         })
      |> Repo.insert()

    {:ok, user2} =
      %User{}
      |> User.registration_changeset(%{
           email: "fake2@email.com",
           name: "Name2",
           password: "Password2"
         })
      |> Repo.insert()

    Rating.rate_image(image.slug, 3, user1.id)

    rating1 =
      [image.slug]
      |> Image.get_all_by_slugs(user1.id)
      |> Enum.at(0)
      |> Map.get(:rating)

    rating2 =
      [image.slug]
      |> Image.get_all_by_slugs(user2.id)
      |> Enum.at(0)
      |> Map.get(:rating)

    assert rating1.rating == 3
    assert rating2 == nil
  end
end
