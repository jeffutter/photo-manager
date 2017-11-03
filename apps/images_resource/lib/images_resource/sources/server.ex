defmodule ImagesResource.Sources.Server do
  @callback refresh(state :: term) :: {:ok, new_state} | {:error, reason}
            when reason: term, new_state: term

  defmacro __using__(opts) do
    quote location: :keep, bind_quoted: [opts: opts] do
      @behaviour ImagesResource.Sources.Server

      alias ImagesResource.Storage.Directory

      require Logger
      use GenServer

      @type t :: %{
              tree: Gallery.t() | nil,
              name: atom() | nil,
              sync_targets: [atom()],
              refresh_period: integer(),
              options: Keyword.t()
            }
      defstruct tree: nil, name: nil, sync_targets: [], refresh_period: 60, options: []

      def start_link(name, opts \\ []) do
        sync_targets = Keyword.get(opts, :sync_targets)
        refresh_period = Keyword.get(opts, :refresh_period, 60)
        tree = Directory.new("root")
        opts = Keyword.drop(opts, [:sync_targets, :refresh_period])

        GenServer.start_link(
          __MODULE__,
          %__MODULE__{
            name: name,
            sync_targets: sync_targets,
            tree: tree,
            refresh_period: refresh_period,
            options: opts
          },
          name: name
        )
      end

      def init(state = %__MODULE__{refresh_period: refresh_period}) do
        case refresh(state) do
          {:ok, state} ->
            auto_refresh(refresh_period)
            {:ok, state}

          {:error, e} ->
            Logger.error("Error refreshing #{__MODULE__} at start: #{inspect(e)}")
            auto_refresh(refresh_period)
            {:ok, state}
        end
      end

      def handle_info(:auto_refresh, state = %__MODULE__{refresh_period: refresh_period}) do
        case refresh(state) do
          {:ok, state} ->
            auto_refresh(refresh_period)
            {:noreply, state}

          {:error, e} ->
            Logger.error("Error auto-refreshing #{__MODULE__}: #{inspect(e)}")
            auto_refresh(refresh_period)
            {:noreply, state}
        end
      end

      defp auto_refresh(refresh_period) do
        Process.send_after(self(), :auto_refresh, refresh_period * 1000)
      end

      def handle_cast(:refresh, state) do
        case refresh(state) do
          {:ok, state} ->
            {:noreply, state}

          {:error, e} ->
            Logger.error("Error refreshing #{__MODULE__}: #{inspect(e)}")
            {:noreply, state}
        end
      end

      def handle_call(:state, _from, state) do
        {:reply, state, state}
      end

      def handle_call(:tree, _from, state) do
        {:reply, state.tree, state}
      end

      def tree(name) do
        GenServer.call(name, :tree)
      end
    end
  end
end
