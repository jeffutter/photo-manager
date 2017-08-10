defmodule ImagesResource.Utils do
  def slug(path, name) do
    path ++ [name]
    |> Path.join
    |> slug
  end
  def slug(name) do
    name
    |> String.downcase
    |> String.replace(~r/([^a-z0-9\/\.])+/, "-")
    |> String.trim("-")
  end

end