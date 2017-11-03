defmodule ImagesResource.Storage.DB do
  alias ImagesResource.Storage.{File, Tree}
  alias PhotoManagementApi.Image
  alias PhotoManagementApi.Repo

  import Ecto.Query

  def ls_tree(path \\ nil, _opts) do
    query = from(i in Image)

    query =
      if path do
        query
        |> where([i], i.path == ^path)
      else
        query
      end

    tree =
      query
      |> Repo.all()
      |> Enum.map(&File.from_ecto/1)
      |> Tree.from_list("root")

    {:ok, tree}
  end
end
