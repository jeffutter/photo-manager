// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Js_null_undefined from "../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as ReactVirtualized from "react-virtualized";

function make(className, defaultHeight, defaultWidth, $staropt$star, $staropt$star$1, children) {
  var disableHeight = $staropt$star ? $staropt$star[0] : false;
  var disableWidth = $staropt$star$1 ? $staropt$star$1[0] : false;
  return ReasonReact.wrapJsForReason(ReactVirtualized.AutoSizer, {
              className: Js_null_undefined.fromOption(className),
              defaultHeight: Js_null_undefined.fromOption(defaultHeight),
              defaultWidth: Js_null_undefined.fromOption(defaultWidth),
              disableHeight: disableHeight,
              disableWidth: disableWidth
            }, children);
}

export {
  make ,
  
}
/* ReasonReact Not a pure module */