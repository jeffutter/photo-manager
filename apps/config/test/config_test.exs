defmodule ConfigTest do
  use ExUnit.Case
  doctest Config

  test "greets the world" do
    assert Config.hello() == :world
  end
end
