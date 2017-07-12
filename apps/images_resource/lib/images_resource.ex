defmodule ImagesResource do
  @moduledoc """
  Documentation for ImagesResource.
  """

  def base_dir do
    Application.get_env(:images_resource, :dir)
  end
end
