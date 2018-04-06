// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Client$PhotoManager from "./lib/client.bs.js";
import * as Header$PhotoManager from "./header.bs.js";
import * as Cookies$PhotoManager from "./cookies.bs.js";
import * as LoginForm$PhotoManager from "./loginForm.bs.js";
import * as GalleryQueries$PhotoManager from "./routes/gallery/galleryQueries.bs.js";
import * as FullPageSpinner$PhotoManager from "./fullPageSpinner.bs.js";
import * as LoadMoreWrapper$PhotoManager from "./loadMoreWrapper.bs.js";
import * as GalleryContainer$PhotoManager from "./galleryContainer.bs.js";

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
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function () {
      ReasonReact.Router[/* push */0](path);
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined);
    });
  return newrecord;
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
  if (match$1 !== 0) {
    if (match) {
      if (match[0] === "gallery") {
        var rest = match[1];
        if (rest) {
          return /* Gallery */Block.__(1, [rest]);
        } else {
          return /* Gallery */Block.__(1, [/* :: */[
                      "root",
                      /* [] */0
                    ]]);
        }
      } else {
        return /* LoginForm */0;
      }
    } else {
      return /* Redirect */Block.__(0, ["/gallery"]);
    }
  } else {
    return /* LoginForm */0;
  }
}

function make$1() {
  var newrecord = component$1.slice();
  newrecord[/* render */9] = (function (self) {
      var match = self[/* state */2][/* route */0];
      var tmp;
      if (typeof match === "number") {
        tmp = ReasonReact.element(/* None */0, /* None */0, LoginForm$PhotoManager.make(/* array */[]));
      } else if (match.tag) {
        var slug = $$Array.of_list(match[0]).join("/");
        var galleryQuery = GalleryQueries$PhotoManager.GalleryQuery[/* make */6](slug, /* () */0);
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
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* route : LoginForm */0];
    });
  newrecord[/* reducer */12] = reducer;
  newrecord[/* subscriptions */13] = (function (self) {
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
    });
  return newrecord;
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
