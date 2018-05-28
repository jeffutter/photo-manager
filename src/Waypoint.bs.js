// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as ReactWaypoint from "react-waypoint";
import * as Js_null_undefined from "../node_modules/bs-platform/lib/es6/js_null_undefined.js";

function make(onEnter, onLeave, bottomOffset, topOffset, fireOnRapidScroll, children) {
  return ReasonReact.wrapJsForReason(ReactWaypoint.default, {
              onEnter: Js_null_undefined.fromOption(onEnter),
              onLeave: Js_null_undefined.fromOption(onLeave),
              bottomOffset: bottomOffset,
              topOffset: topOffset,
              fireOnRapidScroll: fireOnRapidScroll
            }, children);
}

export {
  make ,
  
}
/* ReasonReact Not a pure module */
