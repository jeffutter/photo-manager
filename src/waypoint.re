external waypoint : ReasonReact.reactClass = "react-waypoint" [@@bs.module];

let make
    onEnter::(onEnter: 'a => unit)
    bottomOffset::(bottomOffset: string)
    topOffset::(topOffset: string)
    fireOnRapidScroll::(fireOnRapidScroll: bool)
    children =>
  ReasonReact.wrapJsForReason
    reactClass::waypoint
    props::{
      "onEnter": onEnter,
      "bottomOffset": bottomOffset,
      "topOffset": topOffset,
      "fireOnRapidScroll": Js.Boolean.to_js_boolean fireOnRapidScroll
    }
    children;