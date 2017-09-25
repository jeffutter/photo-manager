external redirect : ReasonReact.reactClass = "Redirect" [@@bs.module "react-router-dom"];

let make _to::(_to: string) from::(from: option string)=? children =>
  ReasonReact.wrapJsForReason
    reactClass::redirect props::{"to": _to, "from": Js.Null_undefined.from_opt from} children;
