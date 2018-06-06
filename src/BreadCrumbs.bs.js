// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as React from "react";
import * as Caml_array from "../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as NavLink$PhotoManager from "./NavLink.bs.js";

var component = ReasonReact.statelessComponent("BreadCrumbs");

var cls = Css.style(/* :: */[
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
                          /* `declaration */[
                            -434952966,
                            /* tuple */[
                              "color",
                              "inherit"
                            ]
                          ],
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

var activeCls = Css.style(/* :: */[
      /* `declaration */[
        -434952966,
        /* tuple */[
          "color",
          "inherit"
        ]
      ],
      /* [] */0
    ]);

function make(path, slug, name, _) {
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
              if (slug === "root") {
                return React.createElement("div", {
                            className: cls
                          }, ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make("/gallery", /* Some */[activeCls], /* None */0, /* array */["Gallery"])));
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
                                  }, ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make(param[/* path */1], /* Some */[activeCls], /* None */0, /* array */[param[/* name */0]])), " / ");
                      }));
                var rootNavLink = ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make("/gallery", /* Some */[activeCls], /* None */0, /* array */["Gallery"]));
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
  activeCls ,
  make ,
  
}
/* component Not a pure module */
