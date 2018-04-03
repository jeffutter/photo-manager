defmodule PhotoManagementApi.Web.Resolver.Gallery do
  alias ImagesResource.Gallery
  alias ImagesResource.Storage.Directory
  alias PhotoManagementApi.{User, ProtectedLinkToken}

  def all(_parent, args, %{context: %{current_user: %User{}}}) do
    args
    |> Map.get(:slug)
    |> find_by_slug()
  end

  def all(_parent, args, %{context: %{protected_link_token: %ProtectedLinkToken{slugs: pl_slugs}}}) do
    slug = Map.get(args, :slug)
    IO.inspect(slug)
    IO.inspect(pl_slugs)
    case Enum.any?(pl_slugs, fn pl_slug -> String.starts_with?(slug, pl_slug) end) do
      true ->
        find_by_slug(slug)
      false ->
        {:error, "Not Authorized"}
    end
  end

  defp find_by_slug(slug) do
    case Gallery.find_by_slug(slug) do
      %Directory{name: name, children: children, path: path, slug: slug} ->
        {
          :ok,
          %{
            name: name,
            path: path,
            slug: slug,
            children: children,
            total_children: length(children)
          }
        }

      _ ->
        {:error, "Slug #{slug} not found"}
    end
  end
end
