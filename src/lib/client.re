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

let errorHandler = _errorResponse => ();

/* switch (errorResponse##networkError) {
   | Some(error) =>
     if (error##statusCode == 401) {
       Cookies.logOut(~setWarning=true, ());
     } else {
       ();
     }
   | None => ()
   }; */
let errorLink = ApolloLinks.createErrorLink(errorHandler);

/* Create an HTTP Link */
let httpLink = ApolloLinks.createHttpLink(~uri="/graphiql", ());

module Instance =
  ReasonApollo.CreateClient(
    {
      let apolloClient =
        ReasonApollo.createApolloClient(
          ~cache=inMemoryCache /* restore method can be piped e.g. inMemoryCache |> restore(window.__APOLLO__) */,
          ~link=ApolloLinks.from([|context, errorLink, httpLink|]),
          (),
        );
    },
  );