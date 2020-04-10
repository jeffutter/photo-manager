[@bs.deriving abstract]
type size = {
  height: int,
  width: int,
};

[@react.component] [@bs.module "react-virtualized"]
external make:
  (
    ~className: option(string)=?,
    ~defaultHeight: option(string)=?,
    ~defaultWidth: option(string)=?,
    ~disableHeight: bool,
    ~disableWidth: bool,
    ~children: size => ReasonReact.reactElement
  ) =>
  React.element =
  "AutoSizer";