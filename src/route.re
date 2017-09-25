external route : ReasonReact.reactClass = "Route" [@@bs.module "react-router-dom"];

/* let wrapComponent componentMake jsProps =>
   ReasonReact.element (
     componentMake match::jsProps##_match location::jsProps##location history::jsProps##history [||]
   ); */
let make
    /* ::componentMake */
    component::(component: option ('a => ReasonReact.reactElement))=?
    exact::(exact: bool)=false
    path::(path: string)
    render::(render: option (unit => ReasonReact.reactElement))=?
    children =>
  ReasonReact.wrapJsForReason
    reactClass::route
    props::{
      "component": Js.Null_undefined.from_opt component,
      /* "component": wrapComponent componentMake, */
      "exact": Js.Boolean.to_js_boolean exact,
      "path": path,
      "render": render
    }
    children;
