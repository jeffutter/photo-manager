[@bs.module "react-apollo"] external apolloProvider : ReasonReact.reactClass = "ApolloProvider";

let make = (~client, children) =>
  ReasonReact.wrapJsForReason(~reactClass=apolloProvider, ~props={"client": client}, children);
