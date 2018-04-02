let component = ReasonReact.statelessComponent("Link");

let handleClick = (onClick: option((ReactEventRe.Mouse.t => unit)), href, event) => {
  switch onClick {
  | Some(onClick) => onClick(event)
  | None => ()
  };
  /* the default action will reload the page, which will cause us to lose state */
  if (! ReactEventRe.Mouse.defaultPrevented(event)) {
    ReactEventRe.Mouse.preventDefault(event);
    ReasonReact.Router.push(href)
  }
};

let make = (~className="", ~href, ~onClick: option((ReactEventRe.Mouse.t => unit))=?, children) => {
  ...component,
  render: (_self) =>
    ReasonReact.createDomElement(
      "a",
      ~props={"href": href, "onClick": handleClick(onClick, href), "className": className},
      children
    )
};