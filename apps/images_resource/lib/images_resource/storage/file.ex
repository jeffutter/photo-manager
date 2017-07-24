defmodule ImagesResource.Storage.File do
  @type t :: %{name: String.t, size: integer, last_modified: DateTime.t, path: list(String.t)}
  defstruct name: "", size: nil, last_modified: nil, path: []
end
