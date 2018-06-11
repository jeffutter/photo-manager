[@bs.module "react-virtualized"]
external windowScroller : ReasonReact.reactClass = "WindowScroller";

[@bs.deriving abstract]
type onChildScroll = {scrollTop: int};

[@bs.deriving abstract]
type childrenOptions = {
  height: int,
  isScrolling: bool,
  onChildScroll: onChildScroll => unit,
  scrollTop: int,
};

let make = (children: childrenOptions => ReasonReact.reactElement) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=windowScroller,
    ~props=Js.Obj.empty(),
    children,
  );
