defmodule ImagesResource.Job do
  defstruct id: nil, event: nil, queue: nil, retry_count: 0, from: nil

  def new(event, queue, from) do
    %__MODULE__{id: :erlang.unique_integer(), event: event, queue: queue, from: from}
  end
end
