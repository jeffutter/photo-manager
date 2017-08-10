defmodule ImagesResource.Sizer.Processor do
  use GenStage

  alias ImagesResource.Sizer.{Queue,Worker}

  def start_link() do
    import Supervisor.Spec

    children = [
      worker(Worker, [], restart: :temporary)
    ]

    ConsumerSupervisor.start_link(children,
      strategy: :one_for_one,
      subscribe_to: [{Queue, max_demand: 3, min_demand: 1}])
  end
end
