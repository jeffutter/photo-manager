external browserRouter : ReasonReact.reactClass = "BrowserRouter" [@@bs.module "react-router-dom"];

external navLink : ReasonReact.reactClass = "NavLink" [@@bs.module "react-router-dom"];

external redirect : ReasonReact.reactClass = "Redirect" [@@bs.module "react-router-dom"];

external router : ReasonReact.reactClass = "Router" [@@bs.module "react-router-dom"];

external route : ReasonReact.reactClass = "Route" [@@bs.module "react-router-dom"];

external toString : string => string = "toString" [@@bs.send]; /* Hack for glamor returning an object */

type renderFunc =
  Js.t {
    .
    _match : Js.Dict.t string, history : History.History.t, location : History.History.Location.t
  } =>
  ReasonReact.reactElement;

let optionToBool optional =>
  switch optional {
  | Some _ => true
  | _ => false
  };

module Router = {
  let make children =>
    ReasonReact.wrapJsForReason reactClass::router props::(Js.Obj.empty ()) children;
};

module BrowserRouter = {
  let make children =>
    ReasonReact.wrapJsForReason reactClass::browserRouter props::(Js.Obj.empty ()) children;
};

module NavLink = {
  let make
      _to::(_to: string)
      innerRef::(innerRef: option (Js.null Dom.element => unit))=?
      className::(className: option string)=?
      activeClassName::(activeClassName: option string)=?
      onClick::(onClick: option (ReactEventRe.Mouse.t => unit))=?
      children =>
    ReasonReact.wrapJsForReason
      reactClass::navLink
      props::{
        "to": _to,
        "innerRef": Js.Null_undefined.from_opt innerRef,
        "className":
          switch className {
          | Some name => toString name
          | None => ""
          },
        "activeClassName":
          switch activeClassName {
          | Some name => toString name
          | None => ""
          },
        "onClick": Js.Null_undefined.from_opt onClick
      }
      children;
};

module Redirect = {
  let make _to::(_to: string) from::(from: option string)=? children =>
    ReasonReact.wrapJsForReason
      reactClass::redirect props::{"to": _to, "from": Js.Null_undefined.from_opt from} children;
};

module Route = {
  let make
      /* ::componentMake */
      component::(component: option ('a => ReasonReact.reactElement))=?
      exact::(exact: option bool)=?
      path::(path: option string)=?
      render::(render: option renderFunc)=?
      children =>
    ReasonReact.wrapJsForReason
      reactClass::route
      props::{
        "exact": Js.Boolean.to_js_boolean (optionToBool exact),
        "path": Js.Null_undefined.from_opt path,
        "component": Js.Null_undefined.from_opt component,
        "render": Js.Null_undefined.from_opt render
      }
      children;
};
