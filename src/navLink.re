external navLink : ReasonReact.reactClass = "NavLink" [@@bs.module "react-router-dom"];

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
      "innerRef": innerRef,
      "className": className,
      "activeClassName": activeClassName,
      "onClick": onClick
    }
    children;
