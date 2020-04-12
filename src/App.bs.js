// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css-emotion/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as ReasonApollo from "../node_modules/reason-apollo/src/ReasonApollo.bs.js";
import * as ReasonReactCompat from "../node_modules/reason-react/src/ReasonReactCompat.js";
import * as ReasonReactRouter from "../node_modules/reason-react/src/ReasonReactRouter.js";
import * as Header$PhotoManager from "./Header.bs.js";
import * as Cookies$PhotoManager from "./Cookies.bs.js";
import * as LoginForm$PhotoManager from "./LoginForm.bs.js";
import * as GalleryQueries$PhotoManager from "./GalleryQueries.bs.js";
import * as LoadMoreWrapper$PhotoManager from "./LoadMoreWrapper.bs.js";
import * as GalleryContainer$PhotoManager from "./GalleryContainer.bs.js";

var cls = Curry._1(Css.style, /* :: */[
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

var make = ReasonReactCompat.wrapReasonReactForReact(component, (function (reactProps) {
        var path = reactProps.path;
        return {
                debugName: component.debugName,
                reactClassInternal: component.reactClassInternal,
                handedOffState: component.handedOffState,
                willReceiveProps: component.willReceiveProps,
                didMount: (function (_self) {
                    return ReasonReactRouter.push(path);
                  }),
                didUpdate: component.didUpdate,
                willUnmount: component.willUnmount,
                willUpdate: component.willUpdate,
                shouldUpdate: component.shouldUpdate,
                render: (function (_self) {
                    return React.createElement("div", undefined);
                  }),
                initialState: component.initialState,
                retainedProps: component.retainedProps,
                reducer: component.reducer,
                jsElementWrapped: component.jsElementWrapped
              };
      }));

var Redirect = {
  component: component,
  make: make
};

function mapUrlToRoute(url) {
  var match = url.path;
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
  var loadMoreQuery = GalleryQueries$PhotoManager.MoreQuery.make(slug, slugs, /* () */0);
  Curry._2(loadMore, Caml_option.some(loadMoreQuery.variables), /* () */0);
  return /* () */0;
}

var Query = ReasonApollo.CreateQuery({
      query: GalleryQueries$PhotoManager.GalleryQuery.query,
      parse: GalleryQueries$PhotoManager.GalleryQuery.parse
    });

function App(Props) {
  var url = ReasonReactRouter.useUrl(undefined, /* () */0);
  var route = mapUrlToRoute(url);
  var tmp;
  if (typeof route === "number") {
    tmp = React.createElement(LoginForm$PhotoManager.make, { });
  } else if (route.tag) {
    var slug = $$Array.of_list(route[0]).join("/");
    var galleryQuery = GalleryQueries$PhotoManager.GalleryQuery.make(slug, /* () */0);
    tmp = React.createElement("div", undefined, React.createElement(Header$PhotoManager.make, { }), React.createElement(Query.make, {
              variables: galleryQuery.variables,
              children: (function (param) {
                  var result = param.result;
                  if (typeof result === "number") {
                    return React.createElement(GalleryContainer$PhotoManager.make, {
                                gallery: undefined,
                                moreGallery: undefined,
                                loadNextPage: (function (param) {
                                    return /* () */0;
                                  })
                              });
                  } else if (result.tag) {
                    var result$1 = result[0];
                    return React.createElement(LoadMoreWrapper$PhotoManager.make, {
                                slug: slug,
                                children: (function (moreGallery, loadMore) {
                                    return React.createElement(GalleryContainer$PhotoManager.make, {
                                                gallery: result$1.gallery,
                                                moreGallery: moreGallery,
                                                loadNextPage: (function (param) {
                                                    return loadNextPage(loadMore, slug, param);
                                                  })
                                              });
                                  })
                              });
                  } else {
                    return React.createElement("div", undefined, "Error Loading Gallery");
                  }
                })
            }));
  } else {
    tmp = React.createElement(make, {
          path: route[0]
        });
  }
  return React.createElement("div", {
              className: cls,
              id: "app"
            }, tmp);
}

var make$1 = App;

export {
  cls ,
  Redirect ,
  mapUrlToRoute ,
  loadNextPage ,
  Query ,
  make$1 as make,
  
}
/* cls Not a pure module */
