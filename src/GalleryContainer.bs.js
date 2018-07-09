// Generated by BUCKLESCRIPT VERSION 4.0.0, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as React from "react";
import * as Caml_obj from "../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_array from "../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Js_primitive from "../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Gallery$PhotoManager from "./Gallery.bs.js";
import * as FullPageSpinner$PhotoManager from "./FullPageSpinner.bs.js";

var component = ReasonReact.statelessComponent("GalleryContainer");

function contains(value, theList) {
  var f = function (found, elem) {
    if (found) {
      return true;
    } else {
      return Caml_obj.caml_equal(elem, value);
    }
  };
  return $$Array.fold_left(f, false, theList);
}

var cls = Css.style(/* :: */[
      Css.padding4(Css.px(56), Css.px(8), Css.px(8), Css.px(8)),
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
            /* :: */[
              Css.boxSizing(Css.borderBox),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

function findDescendantInDescendants(descendant, descendants) {
  var foundIndex = descendants.findIndex((function (moreDescendant) {
          if (descendant[0] >= -795439301) {
            if (typeof moreDescendant === "number" || moreDescendant[0] !== -795439301) {
              return false;
            } else {
              return descendant[1].id === moreDescendant[1].id;
            }
          } else if (typeof moreDescendant === "number" || moreDescendant[0] !== -938956686) {
            return false;
          } else {
            return descendant[1].id === moreDescendant[1].id;
          }
        }));
  if (foundIndex >= 0) {
    return Caml_array.caml_array_get(descendants, foundIndex);
  }
  
}

function mergeGallery(_, gallery) {
  return gallery;
}

function mergeImage(image, moreImage) {
  return {
          id: image.id,
          __typename: image.__typename,
          name: image.name,
          path: image.path,
          slug: image.slug,
          size: image.size,
          width: image.width,
          height: image.height,
          rating: image.rating,
          smallUrl: image.smallUrl,
          mediumUrl: image.mediumUrl,
          largeUrl: image.largeUrl,
          thumbnail: moreImage.thumbnail
        };
}

function convertGallery(gallery) {
  return gallery;
}

function convertImage(image) {
  return {
          id: image.id,
          __typename: image.__typename,
          name: image.name,
          path: image.path,
          slug: image.slug,
          size: image.size,
          width: image.width,
          height: image.height,
          rating: image.rating,
          smallUrl: image.smallUrl,
          mediumUrl: image.mediumUrl,
          largeUrl: image.largeUrl,
          thumbnail: undefined
        };
}

function noMatchCompleteChild(descendant) {
  if (descendant[0] >= -795439301) {
    return /* `CompleteImage */[
            -607871038,
            convertImage(descendant[1])
          ];
  } else {
    return /* `CompleteGallery */[
            121710777,
            descendant[1]
          ];
  }
}

function completeChild(descendant, descendants) {
  if (descendants !== undefined) {
    var foundDescendant = findDescendantInDescendants(descendant, descendants);
    if (foundDescendant !== undefined) {
      var foundDescendant$1 = foundDescendant;
      if (descendant[0] >= -795439301) {
        if (typeof foundDescendant$1 === "number" || foundDescendant$1[0] !== -795439301) {
          return noMatchCompleteChild(descendant);
        } else {
          return /* `CompleteImage */[
                  -607871038,
                  mergeImage(descendant[1], foundDescendant$1[1])
                ];
        }
      } else if (typeof foundDescendant$1 === "number" || foundDescendant$1[0] !== -938956686) {
        return noMatchCompleteChild(descendant);
      } else {
        return /* `CompleteGallery */[
                121710777,
                foundDescendant$1[1]
              ];
      }
    } else {
      return noMatchCompleteChild(descendant);
    }
  } else {
    return noMatchCompleteChild(descendant);
  }
}

function make(gallery, moreGallery, loadNextPage, _) {
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
              var tmp;
              if (gallery !== undefined) {
                if (moreGallery !== undefined) {
                  var moreGallery$1 = Js_primitive.valFromOption(moreGallery);
                  var gallery$1 = Js_primitive.valFromOption(gallery);
                  var match = gallery$1.descendants;
                  if (match !== undefined) {
                    var newDescendants = $$Array.map((function (descendant) {
                            return completeChild(descendant, moreGallery$1.descendants);
                          }), match);
                    tmp = ReasonReact.element(undefined, undefined, Gallery$PhotoManager.make(gallery$1.name, gallery$1.path, gallery$1.slug, newDescendants, loadNextPage, /* array */[]));
                  } else {
                    tmp = ReasonReact.element(undefined, undefined, FullPageSpinner$PhotoManager.make(/* array */[]));
                  }
                } else {
                  tmp = ReasonReact.element(undefined, undefined, FullPageSpinner$PhotoManager.make(/* array */[]));
                }
              } else {
                tmp = ReasonReact.element(undefined, undefined, FullPageSpinner$PhotoManager.make(/* array */[]));
              }
              return React.createElement("div", {
                          className: cls
                        }, tmp);
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
  contains ,
  cls ,
  findDescendantInDescendants ,
  mergeGallery ,
  mergeImage ,
  convertGallery ,
  convertImage ,
  noMatchCompleteChild ,
  completeChild ,
  make ,
  
}
/* component Not a pure module */
