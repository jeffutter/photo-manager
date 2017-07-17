defmodule ImagesResource.Uploaders.Image do
  use Arc.Definition

  @versions [:original, :full, :thumb]

  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png)
    |> Enum.member?(Path.extname(file.file_name))
  end

  # image_optim --allow-lossy --jpegoptim-max-quality 80
  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -interlace none -quality 75 -format jpg", :jpg}
  end
  def transform(:original, _) do
    {:convert, "-strip -resize 1920x1080\> -interlace none -quality 85 -format jpg", :jpg}
  end

  def filename(version, {file, _scope}) do
    file_name = Path.basename(file.file_name, Path.extname(file.file_name))
    "#{version}_#{file_name}"
  end

  def storage_dir(_version, {_file, scope}) do
    "uploads/#{scope.name}"
  end

  def s3_object_headers(_version, {file, _scope}) do
    [content_type: Plug.MIME.path(file.file_name)]
  end
end
