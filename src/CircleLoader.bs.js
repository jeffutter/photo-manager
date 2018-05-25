// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";

var component = ReasonReact.statelessComponent("CircleLoader");

var cls = Css.style(/* :: */[
      Css.margin2(Css.zero, Css.auto),
      /* :: */[
        Css.display(Css.block),
        /* [] */0
      ]
    ]);

function make() {
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
              return React.createElement("svg", {
                          className: cls,
                          height: "225px",
                          width: "300px",
                          stroke: "#fff",
                          viewBox: "0 0 44 44",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, React.createElement("g", {
                              fill: "none",
                              fillRule: "evenodd",
                              strokeWidth: "2"
                            }, React.createElement("circle", {
                                  cx: "22",
                                  cy: "22",
                                  r: "1"
                                }, React.createElement("animate", {
                                      attributeName: "r",
                                      begin: "0s",
                                      calcMode: "spline",
                                      dur: "1.8s",
                                      keySplines: "0.165, 0.84, 0.44, 1",
                                      keyTimes: "0; 1",
                                      repeatCount: "indefinite",
                                      values: "1; 20"
                                    }), React.createElement("animate", {
                                      attributeName: "stroke-opacity",
                                      begin: "0s",
                                      calcMode: "spline",
                                      dur: "1.8s",
                                      keySplines: "0.3, 0.61, 0.355, 1",
                                      keyTimes: "0; 1",
                                      repeatCount: "indefinite",
                                      values: "1; 0"
                                    })), React.createElement("circle", {
                                  cx: "22",
                                  cy: "22",
                                  r: "1"
                                }, React.createElement("animate", {
                                      attributeName: "r",
                                      begin: "-0.9s",
                                      calcMode: "spline",
                                      dur: "1.8s",
                                      keySplines: "0.165, 0.84, 0.44, 1",
                                      keyTimes: "0; 1",
                                      repeatCount: "indefinite",
                                      values: "1; 20"
                                    }), React.createElement("animate", {
                                      attributeName: "stroke-opacity",
                                      begin: "-0.9s",
                                      calcMode: "spline",
                                      dur: "1.8s",
                                      keySplines: "0.3, 0.61, 0.355, 1",
                                      keyTimes: "0; 1",
                                      repeatCount: "indefinite",
                                      values: "1; 0"
                                    }))));
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
