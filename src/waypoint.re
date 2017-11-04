[@bs.module] external waypoint : ReasonReact.reactClass = "react-waypoint";

let make =
    (
      ~onEnter: option(('a => unit))=?,
      ~bottomOffset: string,
      ~topOffset: string,
      ~fireOnRapidScroll: bool,
      children
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=waypoint,
    ~props={
      "onEnter": Js.Null_undefined.from_opt(onEnter),
      "bottomOffset": bottomOffset,
      "topOffset": topOffset,
      "fireOnRapidScroll": Js.Boolean.to_js_boolean(fireOnRapidScroll)
    },
    children
  );
