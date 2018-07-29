// Generated by BUCKLESCRIPT VERSION 4.0.2, PLEASE EDIT WITH CARE

import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Js_null_undefined from "../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as ReactVirtualized from "react-virtualized";

function make(autoHeight, cellRenderer, className, columnCount, columnWidth, height, isScrolling, onScroll, overscanColumnCount, overscanRowCount, rowCount, rowHeight, scrollTop, width, _) {
  return ReasonReact.wrapJsForReason(ReactVirtualized.Grid, {
              autoHeight: Js_null_undefined.fromOption(autoHeight),
              cellRenderer: cellRenderer,
              className: Js_null_undefined.fromOption(className),
              columnCount: columnCount,
              columnWidth: columnWidth,
              height: height,
              isScrolling: Js_null_undefined.fromOption(isScrolling),
              onScroll: Js_null_undefined.fromOption(onScroll),
              overscanColumnCount: Js_null_undefined.fromOption(overscanColumnCount),
              overscanRowCount: Js_null_undefined.fromOption(overscanRowCount),
              rowCount: rowCount,
              rowHeight: rowHeight,
              scrollTop: Js_null_undefined.fromOption(scrollTop),
              width: width
            }, /* array */[]);
}

export {
  make ,
  
}
/* ReasonReact Not a pure module */
