defmodule ImagesResource.Queue.QueueTest do
  use ExUnit.Case

  alias ImagesResource.Queue.{Job, Queue}

  defmodule Worker do
    def start_link(job = %Job{queue: queue, from: from, event: event}) do
      Task.start_link(fn ->
        case event do
          :ack ->
            Queue.ack(queue, job)
            Process.send(from, event, [])

          :nack ->
            Queue.nack(queue, %Job{job | event: :ack})
            Process.send(from, event, [])

          {:sleep, _} ->
            :timer.sleep(50)
            Queue.ack(queue, job)
            Process.send(from, event, [])

          _ ->
            Process.send(from, event, [])
        end
      end)
    end
  end

  defmodule Processor do
    def start_link(queue) do
      import Supervisor.Spec

      children = [
        worker(Worker, [], restart: :temporary)
      ]

      ConsumerSupervisor.start_link(
        children,
        strategy: :one_for_one,
        subscribe_to: [{queue, max_demand: 3, min_demand: 1}]
      )
    end
  end

  test "it processes a job" do
    {:ok, _queue} = Queue.start_link(TestQueue)
    {:ok, _processor} = Processor.start_link(TestQueue)
    Queue.add(TestQueue, "foo")
    assert_receive "foo", 500
    %Queue{in_progress: in_progress} = Queue.state(TestQueue)
    assert length(Map.keys(in_progress)) == 1
  end

  test "acks a job" do
    {:ok, _queue} = Queue.start_link(TestQueue)
    {:ok, _processor} = Processor.start_link(TestQueue)
    Queue.add(TestQueue, :ack)
    assert_receive :ack, 500
    %Queue{in_progress: in_progress} = Queue.state(TestQueue)
    assert length(Map.keys(in_progress)) == 0
  end

  test "retries a job" do
    {:ok, _queue} = Queue.start_link(TestQueue)
    {:ok, _processor} = Processor.start_link(TestQueue)
    Queue.add(TestQueue, :nack)
    assert_receive :nack, 500
    assert_receive :ack, 500
    %Queue{in_progress: in_progress} = Queue.state(TestQueue)
    assert length(Map.keys(in_progress)) == 0
  end

  test "processes 3 at a time" do
    {:ok, _queue} = Queue.start_link(TestQueue)
    {:ok, _processor} = Processor.start_link(TestQueue)

    0..9
    |> Enum.each(fn n -> Queue.add(TestQueue, {:sleep, n}) end)

    :timer.sleep(10)
    %Queue{q: q, in_progress: in_progress} = Queue.state(TestQueue)
    assert :queue.len(q) == 7
    assert length(Map.keys(in_progress)) == 3

    :timer.sleep(50)
    assert_receive {:sleep, 0}, 10
    assert_receive {:sleep, 1}, 10
    assert_receive {:sleep, 2}, 10
    %Queue{q: q, in_progress: in_progress} = Queue.state(TestQueue)
    assert :queue.len(q) == 4
    assert length(Map.keys(in_progress)) == 3

    :timer.sleep(50)
    assert_receive {:sleep, 3}, 10
    assert_receive {:sleep, 4}, 10
    assert_receive {:sleep, 5}, 10
    %Queue{q: q, in_progress: in_progress} = Queue.state(TestQueue)
    assert :queue.len(q) == 1
    assert length(Map.keys(in_progress)) == 3

    :timer.sleep(50)
    assert_receive {:sleep, 6}, 10
    assert_receive {:sleep, 7}, 10
    assert_receive {:sleep, 8}, 10
    %Queue{q: q, in_progress: in_progress} = Queue.state(TestQueue)
    assert :queue.len(q) == 0
    assert length(Map.keys(in_progress)) == 1

    :timer.sleep(50)
    assert_receive {:sleep, 9}, 10
    %Queue{q: q, in_progress: in_progress} = Queue.state(TestQueue)
    assert :queue.len(q) == 0
    assert length(Map.keys(in_progress)) == 0
  end
end
