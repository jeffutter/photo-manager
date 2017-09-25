external router : ReasonReact.reactClass = "Router" [@@bs.module "react-router-dom"];

let make children =>
  ReasonReact.wrapJsForReason reactClass::router props::(Js.Obj.empty ()) children;
