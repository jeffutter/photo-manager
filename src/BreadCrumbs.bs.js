// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css-emotion/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_array from "../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as NavLink$PhotoManager from "./NavLink.bs.js";

var cls = Curry._1(Css.style, /* :: */[
      Css.margin2(Css.rem(1.0), Css.zero),
      /* :: */[
        Css.fontSize(Css.em(2.0)),
        /* :: */[
          Css.selector("& a", /* :: */[
                Css.textDecoration(Css.none),
                /* :: */[
                  Css.borderBottom(Css.px(1), /* solid */12956715, Css.hex("ccc")),
                  /* :: */[
                    Css.selector("&:active, &:visited", /* :: */[
                          Css.unsafe("color", "inherit"),
                          /* [] */0
                        ]),
                    /* [] */0
                  ]
                ]
              ]),
          /* [] */0
        ]
      ]
    ]);

var activeCls = Curry._1(Css.style, /* :: */[
      Css.unsafe("color", "inherit"),
      /* [] */0
    ]);

function BreadCrumbs(Props) {
  var path = Props.path;
  var slug = Props.slug;
  var name = Props.name;
  if (slug === "root") {
    return React.createElement("div", {
                className: cls
              }, React.createElement(NavLink$PhotoManager.make, {
                    to: "/gallery",
                    className: activeCls,
                    children: "Gallery"
                  }));
  } else {
    var splitSlug = slug.split("/").slice(0, -1);
    var pathObjs = splitSlug.reduce((function (acc, section, idx) {
            var s = splitSlug.slice(0, idx);
            var n = Caml_array.caml_array_get(path, idx);
            var p = s.join("/");
            s.push(section);
            acc.push(/* record */[
                  /* name */n,
                  /* path */"/gallery/" + p
                ]);
            return acc;
          }), /* array */[]);
    var links = pathObjs.map((function (param, idx) {
            return React.createElement("span", {
                        key: idx.toString()
                      }, React.createElement(NavLink$PhotoManager.make, {
                            to: param[/* path */1],
                            className: activeCls,
                            children: param[/* name */0]
                          }), " / ");
          }));
    var rootNavLink = React.createElement(NavLink$PhotoManager.make, {
          to: "/gallery",
          className: activeCls,
          children: "Gallery"
        });
    return ReasonReact.createDomElement("div", {
                className: cls
              }, $$Array.concat(/* :: */[
                    /* array */[
                      rootNavLink,
                      " / "
                    ],
                    /* :: */[
                      links,
                      /* :: */[
                        /* array */[name],
                        /* [] */0
                      ]
                    ]
                  ]));
  }
}

var make = BreadCrumbs;

export {
  cls ,
  activeCls ,
  make ,
  
}
/* cls Not a pure module */
