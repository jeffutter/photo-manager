// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as ReasonApollo from "../node_modules/reason-apollo/src/ReasonApollo.bs.js";
import * as LoadMoreCache$PhotoManager from "./LoadMoreCache.bs.js";
import * as GalleryQueries$PhotoManager from "./GalleryQueries.bs.js";

var Query = ReasonApollo.CreateQuery([
      GalleryQueries$PhotoManager.MoreQuery[2],
      GalleryQueries$PhotoManager.MoreQuery[3]
    ]);

var component = ReasonReact.reducerComponent("LoadMoreWrapper");

function make(slug, children) {
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
          /* render */(function (self) {
              console.log("Render load more wrapper");
              var loadMoreQuery = GalleryQueries$PhotoManager.MoreQuery[/* make */7](slug, self[/* state */1][/* slugs */0], /* () */0);
              return ReasonReact.element(/* None */0, /* None */0, Curry.app(Query[/* make */3], [
                              /* Some */[loadMoreQuery.variables],
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              (function (param) {
                                  var result = param[/* result */0];
                                  var fMore = function (slugs) {
                                    return Curry._1(self[/* send */3], /* Fetch */[slugs]);
                                  };
                                  if (typeof result === "number") {
                                    return ReasonReact.element(/* None */0, /* None */0, LoadMoreCache$PhotoManager.make(/* None */0, (function (gallery) {
                                                      return Curry._2(children, gallery, fMore);
                                                    })));
                                  } else if (result.tag) {
                                    var response = result[0];
                                    console.log("Result Gallery", response.gallery);
                                    return ReasonReact.element(/* None */0, /* None */0, LoadMoreCache$PhotoManager.make(response.gallery, (function (gallery) {
                                                      return Curry._2(children, gallery, fMore);
                                                    })));
                                  } else {
                                    return ReasonReact.element(/* None */0, /* None */0, LoadMoreCache$PhotoManager.make(/* None */0, (function (gallery) {
                                                      return Curry._2(children, gallery, fMore);
                                                    })));
                                  }
                                })
                            ]));
            }),
          /* initialState */(function () {
              return /* record */[/* slugs : array */[]];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, _) {
              return /* Update */Block.__(0, [/* record */[/* slugs */action[0]]]);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Query ,
  component ,
  make ,
  
}
/* Query Not a pure module */
