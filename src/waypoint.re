[@bs.module] external waypoint : ReasonReact.reactClass = "react-waypoint";

let make =
    (
      ~onEnter: 'a => unit,
      ~bottomOffset: string,
      ~topOffset: string,
      ~fireOnRapidScroll: bool,
      children
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=waypoint,
    ~props={
      "onEnter": onEnter,
      "bottomOffset": bottomOffset,
      "topOffset": topOffset,
      "fireOnRapidScroll": Js.Boolean.to_js_boolean(fireOnRapidScroll)
    },
    children
  );
