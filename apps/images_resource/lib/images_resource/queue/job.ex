defmodule ImagesResource.Queue.Job do
  @type t :: %{
          id: integer | nil,
          event: any | nil,
          queue: term | nil,
          retry_count: integer,
          from: pid | nil
        }
  defstruct id: nil, event: nil, queue: nil, retry_count: 0, from: nil

  @spec new(any, term, pid) :: t
  def new(event, queue, from) do
    %__MODULE__{id: :erlang.unique_integer(), event: event, queue: queue, from: from}
  end
end
