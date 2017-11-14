defmodule ImagesResource.Queue.Logger do
  defmacro __using__(_) do
    quote do
      require Logger

      def log(level, job, message, details \\ nil) do
        output = inspect(__MODULE__) <> " - " <> message <> " for: " <> inspect(job)

        output =
          if details do
            output <> " - " <> details
          else
            output
          end

        case level do
          :error -> Logger.error(output)
          :warn -> Logger.warn(output)
          :info -> Logger.info(output)
          :debug -> Logger.debug(output)
        end
      end
    end
  end
end
