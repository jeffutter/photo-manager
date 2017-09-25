external apolloProvider : ReasonReact.reactClass = "ApolloProvider" [@@bs.module "react-apollo"];

let make ::client children =>
  ReasonReact.wrapJsForReason reactClass::apolloProvider props::{"client": client} children;
