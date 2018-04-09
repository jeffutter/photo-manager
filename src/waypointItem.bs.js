// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Waypoint$PhotoManager from "./waypoint.bs.js";

function cls(w, h) {
  return Css.style(/* :: */[
              Css.width(Css.px(w)),
              /* :: */[
                Css.height(Css.px(h)),
                /* [] */0
              ]
            ]);
}

var component = ReasonReact.statelessComponentWithRetainedProps("WaypointItem");

function make(onEnter, name, slug, thumbnail, rating, w, h, children) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = (function (param) {
      return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */3], param[/* newSelf */1][/* retainedProps */3]);
    });
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, Waypoint$PhotoManager.make(onEnter, "-400px", "200px", /* false */0, /* array */[React.createElement("div", {
                            className: cls(w, h)
                          }, Curry._1(children, /* () */0))]));
    });
  newrecord[/* retainedProps */11] = /* record */[
    /* name */name,
    /* slug */slug,
    /* thumbnail */thumbnail,
    /* rating */rating
  ];
  return newrecord;
}

export {
  cls ,
  component ,
  make ,
  
}
/* component Not a pure module */
