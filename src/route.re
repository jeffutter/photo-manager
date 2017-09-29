type renderFunc =
  Js.t {
    .
    _match : Js.Dict.t string, history : History.History.t, location : History.History.Location.t
  } =>
  ReasonReact.reactElement;

external route : ReasonReact.reactClass = "Route" [@@bs.module "react-router-dom"];

let optionToBool optional =>
  switch optional {
  | Some _ => true
  | _ => false
  };

let make
    /* ::componentMake */
    component::(component: option ('a => ReasonReact.reactElement))=?
    exact::(exact: option bool)=?
    path::(path: option string)=?
    render::(render: option renderFunc)=?
    children =>
  ReasonReact.wrapJsForReason
    reactClass::route
    props::{
      "exact": Js.Boolean.to_js_boolean (optionToBool exact),
      "path": Js.Null_undefined.from_opt path,
      "component": Js.Null_undefined.from_opt component,
      "render": Js.Null_undefined.from_opt render
    }
    children;
