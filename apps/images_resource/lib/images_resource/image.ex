defmodule ImagesResource.Image do
  @moduledoc """
  Documentation for ImagesResource.
  """

  alias ImagesResource.{Gallery}

  @type t :: %{name: String.t, path: String.t, gallery: Gallery.t}
  defstruct name: "", path: "", gallery: %Gallery{}

  def to_struct(gallery = %Gallery{name: name}, file_name) do
    %__MODULE__{name: file_name, path: name, gallery: gallery}
  end

  def stat(image) do
    image
    |> full_path
    |> File.stat([time: :posix])
  end

  def full_path(%__MODULE__{name: name, path: path}) do
    [ImagesResource.base_dir, path, name]
    |> Path.join
  end

  def arc_path(image, version) do
    [File.cwd!, url(image, version)]
    |> Path.join
  end

  def url(image, version) do
    image
    |> to_arc_tuple
    |> ImagesResource.Uploaders.Image.url(version)
  end

  def type(image, version) do
    t = image
    |> url(version)
    |> Path.extname
    |> String.slice(1..-1)
    case t do
      "jpg" -> "jpeg"
      _ -> t
    end
  end

  def base_64(image, version) do
    with path <- arc_path(image, version),
         {:ok, raw_data} <- File.read(path),
         base64_data <- :base64.encode(raw_data),
         extension <- type(image, version),
         output <- "data:image/" <> extension <> ";base64," <> base64_data
      do
        {:ok, output}
      else
        {:error, :enoent} ->
          {:ok, _} = image
          |> to_arc_tuple
          |> ImagesResource.Uploaders.Image.store

          {:ok, output} = base_64(image, version)
          {:ok, output}
        _e ->
          {:error, "Unable to read file #{ImagesResource.Uploaders.Image.url(full_path(image))}"}
    end
  end

  defp to_arc_tuple(image) do
    {full_path(image), image.gallery}
  end
end
