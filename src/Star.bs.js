// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";

var component = ReasonReact.statelessComponent("Star");

var cls = Css.style(/* :: */[
      Css.color(Css.hex("828282")),
      /* :: */[
        Css.cursor(/* pointer */-786317123),
        /* :: */[
          Css.padding2(Css.zero, Css.px(2)),
          /* [] */0
        ]
      ]
    ]);

function star(filled) {
  if (filled) {
    return "★";
  } else {
    return "☆";
  }
}

function make($staropt$star, index, handleClick, _) {
  var filled = $staropt$star !== undefined ? $staropt$star : false;
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
              var handleClickWithI = Curry._1(handleClick, index);
              return React.createElement("span", {
                          className: cls,
                          onClick: handleClickWithI
                        }, filled ? "★" : "☆");
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
  star ,
  make ,
  
}
/* component Not a pure module */
