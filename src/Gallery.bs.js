// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as List from "../node_modules/bs-platform/lib/es6/list.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Utils$PhotoManager from "./Utils.bs.js";
import * as PhotoSwipe$PhotoManager from "./PhotoSwipe.bs.js";
import * as BreadCrumbs$PhotoManager from "./BreadCrumbs.bs.js";
import * as GalleryBody$PhotoManager from "./GalleryBody.bs.js";
import * as WindowScroller$PhotoManager from "./WindowScroller.bs.js";

var component = ReasonReact.reducerComponent("Gallery");

function splitDescendants(_param, _descendants) {
  while(true) {
    var param = _param;
    var descendants = _descendants;
    var images = param[1];
    var thumbedImageSlugs = param[0];
    if (descendants) {
      var descendant = descendants[0];
      var rest = descendants[1];
      if (descendant[0] >= 121710777) {
        _descendants = rest;
        _param = /* tuple */[
          thumbedImageSlugs,
          images
        ];
        continue ;
      } else {
        var image = descendant[1];
        var match = image.thumbnail;
        _descendants = rest;
        if (match) {
          _param = /* tuple */[
            /* :: */[
              image.slug,
              thumbedImageSlugs
            ],
            /* :: */[
              image,
              images
            ]
          ];
          continue ;
        } else {
          _param = /* tuple */[
            thumbedImageSlugs,
            /* :: */[
              image,
              images
            ]
          ];
          continue ;
        }
      }
    } else {
      return /* tuple */[
              List.rev(thumbedImageSlugs),
              List.rev(images)
            ];
    }
  };
}

function addFunc(send, thumbedImageSlugs, slug) {
  var slugHasThumb = List.exists((function (imageSlug) {
          return slug === imageSlug;
        }), thumbedImageSlugs);
  if (slugHasThumb) {
    return /* () */0;
  } else {
    return Curry._1(send, /* AddImage */Block.__(1, [slug]));
  }
}

function openLightboxFunc(send, thumbedImageSlugs, slug) {
  var index = $$Array.of_list(thumbedImageSlugs).indexOf(slug);
  return Curry._1(send, /* OpenLightbox */Block.__(0, [index]));
}

function make($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, loadNextPage, _) {
  var name = $staropt$star ? $staropt$star[0] : "";
  var path = $staropt$star$1 ? $staropt$star$1[0] : /* array */[];
  var slug = $staropt$star$2 ? $staropt$star$2[0] : "";
  var descendants = $staropt$star$3 ? $staropt$star$3[0] : /* array */[];
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */(function (param) {
              var state = param[/* state */1];
              return /* record */[
                      /* lightboxIsOpen */state[/* lightboxIsOpen */0],
                      /* currentImage */state[/* currentImage */1],
                      /* pendingImages */state[/* pendingImages */2],
                      /* loadingTimeout */state[/* loadingTimeout */3],
                      /* descendants */descendants
                    ];
            }),
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */(function (param) {
              var newState = param[/* newSelf */1][/* state */1];
              var oldState = param[/* oldSelf */0][/* state */1];
              if (Caml_obj.caml_notequal(oldState[/* descendants */4], newState[/* descendants */4]) || oldState[/* lightboxIsOpen */0] !== newState[/* lightboxIsOpen */0]) {
                return true;
              } else {
                return oldState[/* currentImage */1] !== newState[/* currentImage */1];
              }
            }),
          /* render */(function (self) {
              var match = splitDescendants(/* tuple */[
                    /* [] */0,
                    /* [] */0
                  ], $$Array.to_list(self[/* state */1][/* descendants */4]));
              var thumbedImageSlugs = match[0];
              var swipeImages = List.map((function (image) {
                      return {
                              src: image.largeUrl,
                              msrc: image.smallUrl,
                              w: image.width,
                              h: image.height,
                              title: image.name
                            };
                    }), match[1]);
              var swipeOptions = {
                index: self[/* state */1][/* currentImage */1]
              };
              return ReasonReact.element(/* None */0, /* None */0, WindowScroller$PhotoManager.make((function (windowScrollerOptions) {
                                var windowHeight = windowScrollerOptions.height;
                                var isScrolling = windowScrollerOptions.isScrolling;
                                var onScroll = windowScrollerOptions.onChildScroll;
                                var scrollTop = windowScrollerOptions.scrollTop;
                                var partial_arg = self[/* send */3];
                                var openLightbox = function (param) {
                                  return openLightboxFunc(partial_arg, thumbedImageSlugs, param);
                                };
                                var partial_arg$1 = self[/* send */3];
                                var loadImage = function (param) {
                                  return addFunc(partial_arg$1, thumbedImageSlugs, param);
                                };
                                return React.createElement("div", {
                                            className: Css.style(/* :: */[
                                                  Css.position(/* relative */903134412),
                                                  /* :: */[
                                                    Css.height(Css.pct(100.0)),
                                                    /* [] */0
                                                  ]
                                                ])
                                          }, ReasonReact.element(/* None */0, /* None */0, BreadCrumbs$PhotoManager.make(path, slug, name, /* array */[])), ReasonReact.element(/* None */0, /* None */0, GalleryBody$PhotoManager.make(/* Some */[self[/* state */1][/* descendants */4]], openLightbox, loadImage, windowHeight, isScrolling, onScroll, scrollTop, /* array */[])), ReasonReact.element(/* None */0, /* None */0, PhotoSwipe$PhotoManager.make(/* Some */[self[/* state */1][/* lightboxIsOpen */0]], $$Array.of_list(swipeImages), (function () {
                                                      return Curry._1(self[/* send */3], /* CloseLightbox */0);
                                                    }), swipeOptions, /* array */[])));
                              })));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* lightboxIsOpen */false,
                      /* currentImage */0,
                      /* pendingImages : [] */0,
                      /* loadingTimeout */[/* None */0],
                      /* descendants */descendants
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (typeof action === "number") {
                if (action === 0) {
                  return /* Update */Block.__(0, [/* record */[
                              /* lightboxIsOpen */false,
                              /* currentImage */0,
                              /* pendingImages */state[/* pendingImages */2],
                              /* loadingTimeout */state[/* loadingTimeout */3],
                              /* descendants */state[/* descendants */4]
                            ]]);
                } else {
                  var chunks = Utils$PhotoManager.chunkList(20, state[/* pendingImages */2]);
                  var newState_000 = /* lightboxIsOpen */state[/* lightboxIsOpen */0];
                  var newState_001 = /* currentImage */state[/* currentImage */1];
                  var newState_003 = /* loadingTimeout */[/* None */0];
                  var newState_004 = /* descendants */state[/* descendants */4];
                  var newState = /* record */[
                    newState_000,
                    newState_001,
                    /* pendingImages : [] */0,
                    newState_003,
                    newState_004
                  ];
                  return /* UpdateWithSideEffects */Block.__(2, [
                            newState,
                            (function () {
                                return List.iter((function (chunk) {
                                              return Curry._1(loadNextPage, $$Array.of_list(chunk));
                                            }), chunks);
                              })
                          ]);
                }
              } else if (action.tag) {
                var new_state_000 = /* lightboxIsOpen */state[/* lightboxIsOpen */0];
                var new_state_001 = /* currentImage */state[/* currentImage */1];
                var new_state_002 = /* pendingImages : :: */[
                  action[0],
                  state[/* pendingImages */2]
                ];
                var new_state_003 = /* loadingTimeout */state[/* loadingTimeout */3];
                var new_state_004 = /* descendants */state[/* descendants */4];
                var new_state = /* record */[
                  new_state_000,
                  new_state_001,
                  new_state_002,
                  new_state_003,
                  new_state_004
                ];
                return /* UpdateWithSideEffects */Block.__(2, [
                          new_state,
                          (function (self) {
                              var match = state[/* loadingTimeout */3][0];
                              if (match) {
                                return /* () */0;
                              } else {
                                state[/* loadingTimeout */3][0] = /* Some */[setTimeout((function () {
                                          return Curry._1(self[/* send */3], /* LoadImages */1);
                                        }), 200)];
                                return /* () */0;
                              }
                            })
                        ]);
              } else {
                return /* Update */Block.__(0, [/* record */[
                            /* lightboxIsOpen */true,
                            /* currentImage */action[0],
                            /* pendingImages */state[/* pendingImages */2],
                            /* loadingTimeout */state[/* loadingTimeout */3],
                            /* descendants */state[/* descendants */4]
                          ]]);
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  splitDescendants ,
  addFunc ,
  openLightboxFunc ,
  make ,
  
}
/* component Not a pure module */
