// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as List from "../node_modules/bs-platform/lib/es6/list.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Utils$PhotoManager from "./Utils.bs.js";
import * as PhotoSwipe$PhotoManager from "./PhotoSwipe.bs.js";
import * as BreadCrumbs$PhotoManager from "./BreadCrumbs.bs.js";
import * as GalleryBody$PhotoManager from "./GalleryBody.bs.js";
import * as GalleryImage$PhotoManager from "./GalleryImage.bs.js";
import * as GalleryThumb$PhotoManager from "./GalleryThumb.bs.js";

var component = ReasonReact.reducerComponent("Gallery");

function splitDescendants(_param, _descendants) {
  while(true) {
    var param = _param;
    var descendants = _descendants;
    var galleries = param[2];
    var images = param[1];
    var thumbedImageSlugs = param[0];
    if (descendants) {
      var descendant = descendants[0];
      var rest = descendants[1];
      if (descendant[0] >= 121710777) {
        _descendants = rest;
        _param = /* tuple */[
          thumbedImageSlugs,
          images,
          /* :: */[
            descendant[1],
            galleries
          ]
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
            ],
            galleries
          ];
          continue ;
        } else {
          _param = /* tuple */[
            thumbedImageSlugs,
            /* :: */[
              image,
              images
            ],
            galleries
          ];
          continue ;
        }
      }
    } else {
      return /* tuple */[
              List.rev(thumbedImageSlugs),
              List.rev(images),
              List.rev(galleries)
            ];
    }
  };
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
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = splitDescendants(/* tuple */[
                    /* [] */0,
                    /* [] */0,
                    /* [] */0
                  ], $$Array.to_list(descendants));
              var images = match[1];
              var thumbedImageSlugs = match[0];
              var renderedGalleries = List.map((function (item) {
                      return ReasonReact.element(/* Some */[item.id], /* None */0, GalleryThumb$PhotoManager.make(item.name, item.slug, /* array */[]));
                    }), match[2]);
              var renderedImages = List.mapi((function (index, image) {
                      return ReasonReact.element(/* Some */[image.id], /* None */0, GalleryImage$PhotoManager.make(/* Some */[(function () {
                                          var match = List.exists((function (imageSlug) {
                                                  return image.slug === imageSlug;
                                                }), thumbedImageSlugs);
                                          if (match) {
                                            return /* () */0;
                                          } else {
                                            return Curry._2(self[/* reduce */1], (function () {
                                                          return /* AddImage */Block.__(1, [image.slug]);
                                                        }), /* () */0);
                                          }
                                        })], image.name, image.slug, image.thumbnail, image.rating, Curry._1(self[/* reduce */1], (function () {
                                            return /* OpenLightbox */Block.__(0, [index]);
                                          })), /* array */[]));
                    }), images);
              var renderedDescendants = List.concat(/* :: */[
                    renderedGalleries,
                    /* :: */[
                      renderedImages,
                      /* [] */0
                    ]
                  ]);
              var swipeImages = List.map((function (image) {
                      return {
                              src: image.largeUrl,
                              msrc: image.smallUrl,
                              w: image.width,
                              h: image.height,
                              title: image.name
                            };
                    }), images);
              var swipeOptions = {
                index: self[/* state */2][/* currentImage */1]
              };
              return React.createElement("div", {
                          className: "gallery"
                        }, ReasonReact.element(/* None */0, /* None */0, BreadCrumbs$PhotoManager.make(path, slug, name, /* array */[])), ReasonReact.element(/* None */0, /* None */0, GalleryBody$PhotoManager.make($$Array.of_list(renderedDescendants))), ReasonReact.element(/* None */0, /* None */0, PhotoSwipe$PhotoManager.make(/* Some */[self[/* state */2][/* lightboxIsOpen */0]], $$Array.of_list(swipeImages), Curry._1(self[/* reduce */1], (function () {
                                        return /* CloseLightbox */0;
                                      })), swipeOptions, /* array */[])));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* lightboxIsOpen */false,
                      /* currentImage */0,
                      /* pendingImages : [] */0,
                      /* loadingTimeout */[/* None */0]
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
                              /* loadingTimeout */state[/* loadingTimeout */3]
                            ]]);
                } else {
                  var chunks = Utils$PhotoManager.chunkList(20, state[/* pendingImages */2]);
                  var newState_000 = /* lightboxIsOpen */state[/* lightboxIsOpen */0];
                  var newState_001 = /* currentImage */state[/* currentImage */1];
                  var newState_003 = /* loadingTimeout */[/* None */0];
                  var newState = /* record */[
                    newState_000,
                    newState_001,
                    /* pendingImages : [] */0,
                    newState_003
                  ];
                  return /* UpdateWithSideEffects */Block.__(3, [
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
                var new_state = /* record */[
                  new_state_000,
                  new_state_001,
                  new_state_002,
                  new_state_003
                ];
                return /* UpdateWithSideEffects */Block.__(3, [
                          new_state,
                          (function (self) {
                              var match = state[/* loadingTimeout */3][0];
                              if (match) {
                                return /* () */0;
                              } else {
                                state[/* loadingTimeout */3][0] = /* Some */[setTimeout(Curry._1(self[/* reduce */1], (function () {
                                              return /* LoadImages */1;
                                            })), 200)];
                                return /* () */0;
                              }
                            })
                        ]);
              } else {
                return /* Update */Block.__(0, [/* record */[
                            /* lightboxIsOpen */true,
                            /* currentImage */action[0],
                            /* pendingImages */state[/* pendingImages */2],
                            /* loadingTimeout */state[/* loadingTimeout */3]
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
  make ,
  
}
/* component Not a pure module */
