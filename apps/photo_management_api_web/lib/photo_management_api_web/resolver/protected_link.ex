defmodule PhotoManagementApi.Web.Resolver.ProtectedLink do
  alias PhotoManagementApi.{ProtectedLinkToken}

  def get_protected_link(%{slugs: slugs}, %{
        context: %{current_user: current_user}
      }) do
    {:ok, protected_link_token} = ProtectedLinkToken.create(current_user, slugs)
    {:ok, protected_link_token}
  end
end
