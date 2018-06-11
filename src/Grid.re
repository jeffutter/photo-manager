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
      ~className: option(string)=?,
      ~cellRenderer: cellRenderOptions => ReasonReact.reactElement,
      ~columnCount: int,
      ~columnWidth: int,
      ~height: int,
      ~isScrolling: option(bool)=?,
      ~onScroll: option(WindowScroller.onChildScroll => unit)=?,
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
      "className": Js.Nullable.fromOption(className),
      "cellRenderer": cellRenderer,
      "columnCount": columnCount,
      "columnWidth": columnWidth,
      "onScroll": Js.Nullable.fromOption(onScroll),
      "height": height,
      "isScrolling": Js.Nullable.fromOption(isScrolling),
      "rowCount": rowCount,
      "rowHeight": rowHeight,
      "scrollTop": Js.Nullable.fromOption(scrollTop),
      "width": width,
    },
    [||],
  );
