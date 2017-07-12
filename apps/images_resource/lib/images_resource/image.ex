defmodule ImagesResource.Image do
  @moduledoc """
  Documentation for ImagesResource.
  """

  @type t :: %{name: String.t, path: String.t}
  defstruct name: "", path: ""

  def to_struct(path, file_name) do
    %__MODULE__{name: file_name, path: path}
  end

  def stat(%__MODULE__{name: name, path: path}) do
    [ImagesResource.base_dir, path, name]
    |> Path.join
    |> File.stat([time: :posix])
  end
end
