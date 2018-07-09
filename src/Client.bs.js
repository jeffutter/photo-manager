// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

import * as ApolloLinks from "../node_modules/reason-apollo/src/ApolloLinks.bs.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as ApolloLink from "apollo-link";
import * as Js_primitive from "../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ReasonApollo from "../node_modules/reason-apollo/src/ReasonApollo.bs.js";
import * as ApolloInMemoryCache from "../node_modules/reason-apollo/src/ApolloInMemoryCache.bs.js";
import * as ApolloLinkContext from "apollo-link-context";
import * as Cookies$PhotoManager from "./Cookies.bs.js";

var fragmentMatcher = ApolloInMemoryCache.createIntrospectionFragmentMatcher({
      __schema: {
        types: /* array */[{
            kind: "INTERFACE",
            name: "Child",
            possibleTypes: /* array */[
              {
                name: "Gallery"
              },
              {
                name: "Image"
              }
            ]
          }]
      }
    });

var inMemoryCache = ApolloInMemoryCache.createInMemoryCache(undefined, Js_primitive.some(fragmentMatcher), /* () */0);

var context = ApolloLinkContext.setContext((function () {
        var token = Cookies$PhotoManager.readCookie("access_token");
        if (token !== undefined) {
          return {
                  headers: {
                    authorization: "Bearer " + token
                  }
                };
        } else {
          return { };
        }
      }));

function errorHandler(error) {
  var match = error.networkError;
  if (!(match == null) && match.statusCode === 401) {
    Cookies$PhotoManager.logOut(true, /* () */0);
    return ReasonReact.Router[/* push */0]("/login");
  } else {
    return /* () */0;
  }
}

var errorLink = ApolloLinks.createErrorLink(errorHandler);

var httpLink = ApolloLinks.createHttpLink("/graphiql", undefined, undefined, undefined, undefined, undefined, /* () */0);

var instance = ReasonApollo.createApolloClient(ApolloLink.from(/* array */[
          context,
          errorLink,
          httpLink
        ]), inMemoryCache, undefined, undefined, undefined, undefined, /* () */0);

export {
  fragmentMatcher ,
  inMemoryCache ,
  context ,
  errorHandler ,
  errorLink ,
  httpLink ,
  instance ,
  
}
/* fragmentMatcher Not a pure module */
