// @flow
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { readCookie } from "../cookies.bs.js";
import { logOut } from "../cookies.bs.js";

const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Child",
          possibleTypes: [{ name: "Gallery" }, { name: "Image" }]
        }
      ]
    }
  }
});

const cache = new InMemoryCache({
  fragmentMatcher: myFragmentMatcher
});

const httpLink = createHttpLink({
  // uri: "https://gallery.sadclown.net/graphiql"
  uri: "/graphiql"
});

const middlewareLink = setContext(() => {
  const token = readCookie("access_token");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const beforeLink = middlewareLink.concat(httpLink);

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError && networkError.statusCode === 401) {
    logOut(1);
  }
});

const link = errorLink.concat(beforeLink);

const client = new ApolloClient({
  link: link,
  cache: cache
});

export default client;
export const mutate = client.mutate;
