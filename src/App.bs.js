// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Client$PhotoManager from "./Client.bs.js";
import * as Header$PhotoManager from "./Header.bs.js";
import * as Cookies$PhotoManager from "./Cookies.bs.js";
import * as LoginForm$PhotoManager from "./LoginForm.bs.js";
import * as GalleryQueries$PhotoManager from "./GalleryQueries.bs.js";
import * as FullPageSpinner$PhotoManager from "./FullPageSpinner.bs.js";
import * as LoadMoreWrapper$PhotoManager from "./LoadMoreWrapper.bs.js";
import * as GalleryContainer$PhotoManager from "./GalleryContainer.bs.js";

var cls = Css.style(/* :: */[
      Css.transition(/* Some */[400], /* None */0, /* Some */[/* ease */-1022587922], "all"),
      /* :: */[
        Css.transformStyle(/* preserve3d */589702045),
        /* :: */[
          Css.backfaceVisibility(Css.hidden),
          /* :: */[
            Css.position(Css.absolute),
            /* :: */[
              Css.width(/* `percent */[
                    -119887163,
                    100.0
                  ]),
              /* :: */[
                Css.height(/* `percent */[
                      -119887163,
                      100.0
                    ]),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

var component = ReasonReact.statelessComponent("Redirect");

function make(path, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              ReasonReact.Router[/* push */0](path);
              return /* NoUpdate */0;
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              return React.createElement("div", undefined);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var Redirect = /* module */[
  /* component */component,
  /* make */make
];

function reducer(action, _) {
  return /* Update */Block.__(0, [/* record */[/* route */action[0]]]);
}

var component$1 = ReasonReact.reducerComponent("App");

function mapUrlToRoute(url) {
  var match = url[/* path */0];
  var match$1 = Cookies$PhotoManager.loggedIn(/* () */0);
  if (match) {
    switch (match[0]) {
      case "gallery" : 
          var rest = match[1];
          if (rest) {
            if (match$1) {
              return /* Gallery */Block.__(1, [rest]);
            } else if (match$1) {
              return /* LoginForm */0;
            } else {
              return /* Redirect */Block.__(0, ["/login"]);
            }
          } else if (match$1) {
            return /* Gallery */Block.__(1, [/* :: */[
                        "root",
                        /* [] */0
                      ]]);
          } else if (match$1) {
            return /* LoginForm */0;
          } else {
            return /* Redirect */Block.__(0, ["/login"]);
          }
      case "login" : 
          if (match[1] && !match$1) {
            return /* Redirect */Block.__(0, ["/login"]);
          } else {
            return /* LoginForm */0;
          }
      default:
        if (match$1) {
          return /* LoginForm */0;
        } else {
          return /* Redirect */Block.__(0, ["/login"]);
        }
    }
  } else if (match$1) {
    return /* Redirect */Block.__(0, ["/gallery"]);
  } else if (match$1) {
    return /* LoginForm */0;
  } else {
    return /* Redirect */Block.__(0, ["/login"]);
  }
}

function make$1() {
  return /* record */[
          /* debugName */component$1[/* debugName */0],
          /* reactClassInternal */component$1[/* reactClassInternal */1],
          /* handedOffState */component$1[/* handedOffState */2],
          /* willReceiveProps */component$1[/* willReceiveProps */3],
          /* didMount */component$1[/* didMount */4],
          /* didUpdate */component$1[/* didUpdate */5],
          /* willUnmount */component$1[/* willUnmount */6],
          /* willUpdate */component$1[/* willUpdate */7],
          /* shouldUpdate */component$1[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = self[/* state */2][/* route */0];
              var tmp;
              if (typeof match === "number") {
                tmp = ReasonReact.element(/* None */0, /* None */0, LoginForm$PhotoManager.make(/* array */[]));
              } else if (match.tag) {
                var slug = $$Array.of_list(match[0]).join("/");
                var galleryQuery = GalleryQueries$PhotoManager.GalleryQuery[/* make */7](slug, /* () */0);
                tmp = React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, Header$PhotoManager.make(/* array */[])), ReasonReact.element(/* None */0, /* None */0, Curry._2(Client$PhotoManager.Instance[/* Query */1][/* make */2], galleryQuery, (function (response, parse) {
                                if (typeof response === "number") {
                                  return ReasonReact.element(/* None */0, /* None */0, FullPageSpinner$PhotoManager.make(/* array */[]));
                                } else if (response.tag) {
                                  return React.createElement("div", undefined, response[0]);
                                } else {
                                  var data = Curry._1(parse, response[0]);
                                  return ReasonReact.element(/* None */0, /* None */0, LoadMoreWrapper$PhotoManager.make(slug, (function (moreGallery, loadMore) {
                                                    return ReasonReact.element(/* None */0, /* None */0, GalleryContainer$PhotoManager.make(data.gallery, moreGallery, loadMore, /* array */[]));
                                                  })));
                                }
                              }))));
              } else {
                tmp = ReasonReact.element(/* None */0, /* None */0, make(match[0], /* array */[]));
              }
              return React.createElement("div", {
                          className: cls,
                          id: "app"
                        }, tmp);
            }),
          /* initialState */(function () {
              return /* record */[/* route : LoginForm */0];
            }),
          /* retainedProps */component$1[/* retainedProps */11],
          /* reducer */reducer,
          /* subscriptions */(function (self) {
              return /* :: */[
                      /* Sub */[
                        (function () {
                            return ReasonReact.Router[/* watchUrl */1]((function (url) {
                                          return Curry._1(self[/* send */4], /* ChangeRoute */[mapUrlToRoute(url)]);
                                        }));
                          }),
                        ReasonReact.Router[/* unwatchUrl */2]
                      ],
                      /* [] */0
                    ];
            }),
          /* jsElementWrapped */component$1[/* jsElementWrapped */14]
        ];
}

var Query = 0;

export {
  cls ,
  Redirect ,
  reducer ,
  component$1 as component,
  mapUrlToRoute ,
  Query ,
  make$1 as make,
  
}
/* cls Not a pure module */
