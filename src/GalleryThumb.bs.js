// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as NavLink$PhotoManager from "./NavLink.bs.js";
import * as GalleryItem$PhotoManager from "./GalleryItem.bs.js";
import * as WaypointItem$PhotoManager from "./WaypointItem.bs.js";

var component = ReasonReact.statelessComponent("GalleryThumb");

var cls = Css.style(/* :: */[
      Css.margin2(Css.px(0), Css.auto),
      /* :: */[
        Css.padding(Css.px(8)),
        /* :: */[
          Css.display(Css.block),
          /* [] */0
        ]
      ]
    ]);

function make(name, slug, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              return ReasonReact.element(/* None */0, /* None */0, WaypointItem$PhotoManager.make(/* None */0, name, slug, /* None */0, /* None */0, 320, 275, (function () {
                                return ReasonReact.element(/* None */0, /* None */0, GalleryItem$PhotoManager.make(/* Some */[false], (function (wrapClass, detailsClass) {
                                                  var link = "/gallery/" + slug;
                                                  return ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make(link, /* Some */[wrapClass], /* None */0, /* array */[
                                                                  React.createElement("svg", {
                                                                        className: cls,
                                                                        height: "200px",
                                                                        width: "200px",
                                                                        viewBox: "0 0 8 8"
                                                                      }, React.createElement("path", {
                                                                            id: "folder",
                                                                            d: "M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
                                                                          })),
                                                                  React.createElement("div", {
                                                                        className: detailsClass
                                                                      }, name)
                                                                ]));
                                                })));
                              })));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  cls ,
  make ,
  
}
/* component Not a pure module */
