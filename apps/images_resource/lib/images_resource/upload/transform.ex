defmodule ImagesResource.Upload.Transform do
  use ImagesResource.Worker

  @behaviour ImagesResource.Worker
  def handle_event({original_path, version}) do
    {cmd, args, ext} = transform(version, original_path)

    new_path = generate_temporary_path(original_path, ext)

    args =
      if is_function(args),
        do: args.(original_path, new_path),
        else: [original_path | String.split(args, " ") ++ [new_path]]

    program = to_string(cmd)

    ensure_executable_exists!(program)

    case System.cmd(program, args_list(args), stderr_to_stdout: true) do
      {_, 0} ->
        {:ok, new_path}

      {error_message, _exit_code} ->
        {:error, error_message}
    end
  end

  def transform(:original, _) do
    {:convert, "-strip -quality 90 -format jpg", :jpg}
  end

  def transform(:thumb, _) do
    {:face_crop, fn input, output -> "#{input} #{output}" end, :jpg}
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

  defp args_list(args) when is_list(args), do: args
  defp args_list(args), do: ~w(#{args})

  defp ensure_executable_exists!(program) do
    unless System.find_executable(program) do
      raise "Missing Executable: #{inspect(program)}"
    end
  end

  defp generate_temporary_path(full_path, ext \\ nil) do
    extension = (ext && to_string(ext)) || Path.extname(full_path || "")

    file_name =
      :crypto.strong_rand_bytes(20)
      |> Base.encode32()
      |> Kernel.<>(extension)

    Path.join(System.tmp_dir(), file_name)
  end
end
