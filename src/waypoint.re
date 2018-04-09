[@bs.module "react-waypoint"]
external waypoint : ReasonReact.reactClass = "default";

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~bottomOffset: string,
      ~topOffset: string,
      ~fireOnRapidScroll: bool,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=waypoint,
    ~props={
      "onEnter": Js.Nullable.fromOption(onEnter),
      "bottomOffset": bottomOffset,
      "topOffset": topOffset,
      "fireOnRapidScroll": Js.Boolean.to_js_boolean(fireOnRapidScroll),
    },
    children,
  );
