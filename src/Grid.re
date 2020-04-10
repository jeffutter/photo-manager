[@bs.module "react-virtualized"]
external grid: ReasonReact.reactClass = "Grid";

[@bs.deriving abstract]
type cellRenderOptions = {
  columnIndex: int,
  isVisible: bool,
  key: string,
  rowIndex: int,
  style: ReactDOMRe.style,
};

type rowHeightOptions = {index: int};

[@bs.deriving abstract]
type jsProps = {
  autoHeight: Js.nullable(bool),
  cellRenderer: cellRenderOptions => ReasonReact.reactElement,
  className: Js.nullable(string),
  columnCount: int,
  columnWidth: int,
  height: int,
  isScrolling: Js.nullable(bool),
  onScroll: Js.nullable(WindowScroller.onChildScroll => unit),
  overscanColumnCount: Js.nullable(int),
  overscanRowCount: Js.nullable(int),
  rowCount: int,
  rowHeight: rowHeightOptions => int,
  scrollTop: Js.nullable(int),
  width: int,
};

[@react.component] [@bs.module "react-virtualized"]
external make:
  (
    ~autoHeight: option(bool)=?,
    ~cellRenderer: cellRenderOptions => ReasonReact.reactElement,
    ~className: option(string)=?,
    ~columnCount: int,
    ~columnWidth: int,
    ~height: int,
    ~isScrolling: option(bool)=?,
    ~onScroll: option(WindowScroller.onChildScroll => unit)=?,
    ~overscanColumnCount: option(int)=?,
    ~overscanRowCount: option(int)=?,
    ~rowCount: int,
    ~rowHeight: rowHeightOptions => int,
    ~scrollTop: option(int)=?,
    ~width: int
  ) =>
  React.element =
  "Grid";