external navLink : ReasonReact.reactClass = "NavLink" [@@bs.module "react-router-dom"];

let make
    _to::(_to: string)
    innerRef::(innerRef: option 'a)=?
    className::(className: option string)=?
    activeClassName::(activeClassName: option string)=?
    children => {
  let ref =
    switch innerRef {
    | Some ref => ref
    | None => Js.null
    };
  ReasonReact.wrapJsForReason
    reactClass::navLink
    props::{"to": _to, "innerRef": ref, "className": className, "activeClassName": activeClassName}
    children
};
