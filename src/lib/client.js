import { ApolloClient, IntrospectionFragmentMatcher } from "react-apollo";
import { createApolloFetch } from "apollo-fetch";
import { print } from "graphql/language/printer";
import { readCookie } from "../lib/cookies";

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

const apolloFetch = createApolloFetch({
  uri: "http://localhost:4000/graphiql"
});

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}; // Create the headers object if needed.
  }
  const token = readCookie("access_token");
  options.headers.authorization = token ? `Bearer ${token}` : null;

  next();
});

apolloFetch.useAfter(({ response }, next) => {
  if (response.status === 401) {
    logout();
  }
  next();
});

const networkInterface = {
  query: req => apolloFetch({ ...req, query: print(req.query) })
};

const client = new ApolloClient({
  networkInterface: networkInterface,
  fragmentMatcher: myFragmentMatcher
});

export default client;
