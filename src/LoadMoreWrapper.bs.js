// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as $$Array from "../node_modules/bs-platform/lib/es6/array.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonApollo from "../node_modules/reason-apollo/src/ReasonApollo.bs.js";
import * as Js_null_undefined from "../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as GalleryQueries$PhotoManager from "./GalleryQueries.bs.js";

var Query = ReasonApollo.CreateQuery({
      query: GalleryQueries$PhotoManager.MoreQuery.query,
      parse: GalleryQueries$PhotoManager.MoreQuery.parse
    });

function updateQuery(previousResult, newResults) {
  var match = newResults.fetchMoreResult;
  if (match !== undefined) {
    var match$1 = previousResult.gallery;
    var match$2 = match.gallery;
    var combinedGallery;
    if (match$1 == null) {
      combinedGallery = (match$2 == null) ? undefined : Caml_option.some(match$2);
    } else if (match$2 == null) {
      combinedGallery = Caml_option.some(match$1);
    } else {
      var match$3 = match$1.descendants;
      var match$4 = match$2.descendants;
      var combinedDescendants = (match$3 == null) ? (
          (match$4 == null) ? /* array */[] : match$4
        ) : (
          (match$4 == null) ? match$3 : $$Array.append(match$3, match$4)
        );
      combinedGallery = {
        id: match$1.id,
        name: match$1.name,
        path: match$1.path,
        slug: match$1.slug,
        descendants: Js_null_undefined.fromOption(combinedDescendants),
        __typename: match$1.__typename
      };
    }
    return {
            gallery: Js_null_undefined.fromOption(combinedGallery)
          };
  } else {
    return {
            gallery: null
          };
  }
}

function LoadMoreWrapper(Props) {
  var slug = Props.slug;
  var children = Props.children;
  var loadMoreQuery = GalleryQueries$PhotoManager.MoreQuery.make(slug, /* array */[], /* () */0);
  return React.createElement(Query.make, {
              variables: loadMoreQuery.variables,
              children: (function (param) {
                  var fetchMore = param[/* fetchMore */5];
                  var result = param[/* result */0];
                  if (typeof result === "number") {
                    return Curry._2(children, undefined, (function (param) {
                                  return Curry._2(fetchMore, param, updateQuery);
                                }));
                  } else if (result.tag) {
                    return Curry._2(children, result[0].gallery, (function (param) {
                                  return Curry._2(fetchMore, param, updateQuery);
                                }));
                  } else {
                    return Curry._2(children, undefined, (function (param) {
                                  return Curry._2(fetchMore, param, updateQuery);
                                }));
                  }
                })
            });
}

var make = LoadMoreWrapper;

export {
  Query ,
  updateQuery ,
  make ,
  
}
/* Query Not a pure module */
