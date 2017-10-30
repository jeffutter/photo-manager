defmodule ImagesResource.Uploaders.Image do
  use Arc.Definition

  @versions [:original, :thumb, :small, :medium, :large]
  @version_strings Enum.map(@versions, fn v -> "#{v}" end)
  @acl :public_read
  @async false

  @type arc_location :: {String.t, list(String.t)}

  def validate({file, _}) do
    ~w(.jpg .jpeg .gif .png)
    |> Enum.member?(Path.extname(file.file_name))
  end

  # image_optim --allow-lossy --jpegoptim-max-quality 80
  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail 300x225^ -gravity center -extent 300x225 -interlace none -quality 65 -format jpg", :jpg}
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

  def filename(_version, {%{file_name: name}, _path}) do

    # Hack for GCS client, it was giving me names like larg_larg_file.jpg
    name = case String.split(name, "_") do
             [prefix | rest] when prefix in @version_strings -> Enum.join(rest, "_")
             _ -> name
           end

    Path.basename(name, Path.extname(name))
  end

  def storage_dir(_version, {_file, nil}),   do: ""
  def storage_dir(_version, {_file, ""}),    do: ""
  def storage_dir(_version, {_file, []}),    do: ""
  def storage_dir(version, {_file, path}) do
    Path.join(["#{version}"] ++ path)
  end

  def s3_object_headers(_version, {file, _scope}) do
    [content_type: MIME.from_path(file.file_name)]
  end
end
