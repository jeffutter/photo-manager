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
      ~rowHeight: int,
      ~scrollTop: option(int)=?,
      ~width: int,
      _,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=grid,
    ~props={
      "autoHeight": Js.Nullable.fromOption(autoHeight),
      "cellRenderer": cellRenderer,
      "className": Js.Nullable.fromOption(className),
      "columnCount": columnCount,
      "columnWidth": columnWidth,
      "height": height,
      "isScrolling": Js.Nullable.fromOption(isScrolling),
      "onScroll": Js.Nullable.fromOption(onScroll),
      "overscanColumnCount": Js.Nullable.fromOption(overscanColumnCount),
      "overscanRowCount": Js.Nullable.fromOption(overscanRowCount),
      "rowCount": rowCount,
      "rowHeight": rowHeight,
      "scrollTop": Js.Nullable.fromOption(scrollTop),
      "width": width,
    },
    [||],
  );