// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css-emotion/src/Css.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";

var cls = Curry._1(Css.style, /* :: */[
      Css.margin2(Css.zero, Css.auto),
      /* :: */[
        Css.display(Css.block),
        /* [] */0
      ]
    ]);

function CircleLoader(Props) {
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
}

var make = CircleLoader;

export {
  cls ,
  make ,
  
}
/* cls Not a pure module */
