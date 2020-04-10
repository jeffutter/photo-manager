[@bs.deriving abstract]
type onChildScroll = {scrollTop: int};

[@bs.deriving abstract]
type childrenOptions = {
  height: int,
  isScrolling: bool,
  onChildScroll: onChildScroll => unit,
  scrollTop: int,
};

[@react.component] [@bs.module "react-virtualized"]
external make:
  (~children: childrenOptions => ReasonReact.reactElement) => React.element =
  "WindowScroller";