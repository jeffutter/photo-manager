[@bs.module "react-waypoint"]
external waypoint : ReasonReact.reactClass = "default";

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~onLeave: option('a => unit)=?,
      ~bottomOffset: string,
      ~topOffset: string,
      ~fireOnRapidScroll: bool,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=waypoint,
    ~props={
      "onEnter": Js.Nullable.fromOption(onEnter),
      "onLeave": Js.Nullable.fromOption(onLeave),
      "bottomOffset": bottomOffset,
      "topOffset": topOffset,
      "fireOnRapidScroll": fireOnRapidScroll,
    },
    children,
  );
