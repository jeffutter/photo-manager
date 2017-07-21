defmodule ImagesResource.Uploaders.Image do
  use Arc.Definition

  @versions [:original, :large, :thumb]
  @acl :public_read

  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png)
    |> Enum.member?(Path.extname(file.file_name))
  end

  # image_optim --allow-lossy --jpegoptim-max-quality 80
  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -interlace none -quality 75 -format jpg", :jpg}
  end
  def transform(:small, _) do
    {:convert, "-strip -resize 800x600\> -interlace none -quality 85 -format jpg", :jpg}
  end
  def transform(:medium, _) do
    {:convert, "-strip -resize 1280x800\> -interlace none -quality 85 -format jpg", :jpg}
  end
  def transform(:large, _) do
    {:convert, "-strip -resize 1920x1080\> -interlace none -quality 85 -format jpg", :jpg}
  end

  def filename(version, {file, _scope}) do
    file_name = Path.basename(file.file_name, Path.extname(file.file_name))
    if version == :original do
      file_name
    else
      "#{version}_#{file_name}"
    end
  end

  def storage_dir(_version, {_file, nil}), do: ""
  def storage_dir(_version, {_file, scope}) do
    "#{scope.name}"
  end

  def s3_object_headers(_version, {file, _scope}) do
    [content_type: Plug.MIME.path(file.file_name)]
  end
end
