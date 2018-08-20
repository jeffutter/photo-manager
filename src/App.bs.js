// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Js_primitive from "../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ReasonApollo from "../node_modules/reason-apollo/src/ReasonApollo.bs.js";
import * as Header$PhotoManager from "./Header.bs.js";
import * as Cookies$PhotoManager from "./Cookies.bs.js";
import * as LoginForm$PhotoManager from "./LoginForm.bs.js";
import * as GalleryQueries$PhotoManager from "./GalleryQueries.bs.js";
import * as LoadMoreWrapper$PhotoManager from "./LoadMoreWrapper.bs.js";
import * as GalleryContainer$PhotoManager from "./GalleryContainer.bs.js";

var cls = Css.style(/* :: */[
      Css.transition(400, undefined, /* ease */-1022587922, "all"),
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
              return ReasonReact.Router[/* push */0](path);
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
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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

function loadNextPage(loadMore, slug, slugs) {
  var loadMoreQuery = GalleryQueries$PhotoManager.MoreQuery[/* make */3](slug, slugs, /* () */0);
  Curry._2(loadMore, Js_primitive.some(loadMoreQuery.variables), /* () */0);
  return /* () */0;
}

var Query = ReasonApollo.CreateQuery([
      GalleryQueries$PhotoManager.GalleryQuery[1],
      GalleryQueries$PhotoManager.GalleryQuery[2]
    ]);

function make$1() {
  return /* record */[
          /* debugName */component$1[/* debugName */0],
          /* reactClassInternal */component$1[/* reactClassInternal */1],
          /* handedOffState */component$1[/* handedOffState */2],
          /* willReceiveProps */component$1[/* willReceiveProps */3],
          /* didMount */(function (self) {
              var watcherID = ReasonReact.Router[/* watchUrl */1]((function (url) {
                      return Curry._1(self[/* send */3], /* ChangeRoute */[mapUrlToRoute(url)]);
                    }));
              return Curry._1(self[/* onUnmount */4], (function () {
                            return ReasonReact.Router[/* unwatchUrl */2](watcherID);
                          }));
            }),
          /* didUpdate */component$1[/* didUpdate */5],
          /* willUnmount */component$1[/* willUnmount */6],
          /* willUpdate */component$1[/* willUpdate */7],
          /* shouldUpdate */component$1[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = self[/* state */1][/* route */0];
              var tmp;
              if (typeof match === "number") {
                tmp = ReasonReact.element(undefined, undefined, LoginForm$PhotoManager.make(/* array */[]));
              } else if (match.tag) {
                var slug = $$Array.of_list(match[0]).join("/");
                var galleryQuery = GalleryQueries$PhotoManager.GalleryQuery[/* make */3](slug, /* () */0);
                tmp = React.createElement("div", undefined, ReasonReact.element(undefined, undefined, Header$PhotoManager.make(/* array */[])), ReasonReact.element(undefined, undefined, Curry.app(Query[/* make */3], [
                              Js_primitive.some(galleryQuery.variables),
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              (function (param) {
                                  var result = param[/* result */0];
                                  if (typeof result === "number") {
                                    return ReasonReact.element(undefined, undefined, GalleryContainer$PhotoManager.make(undefined, undefined, (function () {
                                                      return /* () */0;
                                                    }), /* array */[]));
                                  } else if (result.tag) {
                                    var result$1 = result[0];
                                    return ReasonReact.element(undefined, undefined, LoadMoreWrapper$PhotoManager.make(slug, (function (moreGallery, loadMore) {
                                                      return ReasonReact.element(undefined, undefined, GalleryContainer$PhotoManager.make(result$1.gallery, moreGallery, (function (param) {
                                                                        return loadNextPage(loadMore, slug, param);
                                                                      }), /* array */[]));
                                                    })));
                                  } else {
                                    return React.createElement("div", undefined, "Error Loading Gallery");
                                  }
                                })
                            ])));
              } else {
                tmp = ReasonReact.element(undefined, undefined, make(match[0], /* array */[]));
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
          /* jsElementWrapped */component$1[/* jsElementWrapped */13]
        ];
}

export {
  cls ,
  Redirect ,
  reducer ,
  component$1 as component,
  mapUrlToRoute ,
  loadNextPage ,
  Query ,
  make$1 as make,
  
}
/* cls Not a pure module */
