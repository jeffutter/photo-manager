let fragmentMatcher =
  ApolloInMemoryCache.createIntrospectionFragmentMatcher(
    ~data={
      "__schema": {
        "types": [|
          {
            "kind": "INTERFACE",
            "name": "Child",
            "possibleTypes": [|{"name": "Gallery"}, {"name": "Image"}|],
          },
        |],
      },
    },
  );

let inMemoryCache =
  ApolloInMemoryCache.createInMemoryCache(~fragmentMatcher, ());

let context =
  ApolloLinks.apolloLinkSetContext(() => {
    let token = Cookies.readCookie("access_token");
    switch (token) {
    | Some(t) => {
        "headers": {
          authorization: "Bearer " ++ t,
        },
      }
    | None => Js.Obj.empty()
    };
  });

external sketcyConvertErrorResponse :
  ReasonApolloTypes.apolloLinkErrorResponse =>
  {. "networkError": ReasonApolloTypes.networkError} =
  "%identity";

let errorHandler = errorResponse => {
  let error = sketcyConvertErrorResponse(errorResponse);
  if (error##networkError##statusCode == 401) {
    Cookies.logOut(~setWarning=true, ());
    ReasonReact.Router.push("/login");
  } else {
    ();
  };
};

let errorLink = ApolloLinks.createErrorLink(errorHandler);

/* Create an HTTP Link */
let httpLink = ApolloLinks.createHttpLink(~uri="/graphiql", ());

let instance =
  ReasonApollo.createApolloClient(
    ~cache=inMemoryCache,
    ~link=ApolloLinks.from([|context, errorLink, httpLink|]),
    (),
  );
