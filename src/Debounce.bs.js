// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as Belt_Option from "../node_modules/bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "../node_modules/bs-platform/lib/es6/caml_option.js";

function debounce1(fn, timeOutOpt) {
  var timeOut = timeOutOpt !== undefined ? timeOutOpt : 1000;
  var id = {
    contents: null
  };
  return (function (a) {
      Belt_Option.mapWithDefault(Caml_option.nullable_to_opt(id.contents), /* () */0, (function (prim) {
              clearTimeout(prim);
              return /* () */0;
            }));
      id.contents = setTimeout((function (param) {
              return Curry._1(fn, a);
            }), timeOut);
      return /* () */0;
    });
}

export {
  debounce1 ,
  
}
/* No side effect */