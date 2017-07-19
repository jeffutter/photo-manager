defmodule PhotoManagementApi.Web.Resolver.Gallery do

  alias ImagesResource.Galleries

  def all(_parent, _args, _info) do
    Galleries.ls
  end
end
