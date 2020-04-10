// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as ReasonReactRouter from "../node_modules/reason-react/src/ReasonReactRouter.js";

var component = ReasonReact.statelessComponent("Link");

function handleClick(onClick, href, $$event) {
  if (onClick !== undefined) {
    Curry._1(onClick, $$event);
  }
  if ($$event.defaultPrevented) {
    return 0;
  } else {
    $$event.preventDefault();
    return ReasonReactRouter.push(href);
  }
}

function Link(Props) {
  var match = Props.className;
  var className = match !== undefined ? match : "";
  var href = Props.href;
  var onClick = Props.onClick;
  var children = Props.children;
  return React.createElement("a", {
              className: className,
              href: href,
              onClick: (function (param) {
                  return handleClick(onClick, href, param);
                })
            }, children);
}

var make = Link;

export {
  component ,
  handleClick ,
  make ,
  
}
/* component Not a pure module */
