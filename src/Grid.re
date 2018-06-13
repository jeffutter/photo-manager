[@bs.module "react-virtualized"]
external grid : ReasonReact.reactClass = "Grid";

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

/* [@bs.obj]
   external makeProps :
     (
       ~autoHeight: Js.nullable(bool),
       ~cellRenderer: cellRenderOptions => ReasonReact.reactElement,
       ~className: Js.nullable(string),
       ~columnCount: int,
       ~columnWidth: int,
       ~height: int,
       ~isScrolling: Js.nullable(bool),
       ~onScroll: Js.nullable(WindowScroller.onChildScroll => unit),
       ~overscanColumnCount: Js.nullable(int),
       ~overscanRowCount: Js.nullable(int),
       ~rowCount: int,
       ~rowHeight: [@bs.unwrap] [ | `Function(string) | `Number(int)],
       ~scrollTop: Js.nullable(int),
       ~width: int,
       unit
     ) =>
     _ =
     ""; */
let make =
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
      ~width: int,
      _,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=grid,
    ~props=
      jsProps(
        ~autoHeight=Js.Nullable.fromOption(autoHeight),
        ~cellRenderer,
        ~className=Js.Nullable.fromOption(className),
        ~columnCount,
        ~columnWidth,
        ~height,
        ~isScrolling=Js.Nullable.fromOption(isScrolling),
        ~onScroll=Js.Nullable.fromOption(onScroll),
        ~overscanColumnCount=Js.Nullable.fromOption(overscanColumnCount),
        ~overscanRowCount=Js.Nullable.fromOption(overscanRowCount),
        ~rowCount,
        ~rowHeight,
        ~scrollTop=Js.Nullable.fromOption(scrollTop),
        ~width,
      ),
    /* makeProps(
         ~autoHeight=Js.Nullable.fromOption(autoHeight),
         ~cellRenderer,
         ~className=Js.Nullable.fromOption(className),
         ~columnCount,
         ~columnWidth,
         ~height,
         ~isScrolling=Js.Nullable.fromOption(isScrolling),
         ~onScroll=Js.Nullable.fromOption(onScroll),
         ~overscanColumnCount=Js.Nullable.fromOption(overscanColumnCount),
         ~overscanRowCount=Js.Nullable.fromOption(overscanRowCount),
         ~rowCount,
         ~rowHeight,
         ~scrollTop=Js.Nullable.fromOption(scrollTop),
         ~width,
       ), */
    [||],
  );