let component = ReasonReact.statelessComponent("Link");

let handleClick =
    (onClick: option(ReactEvent.Mouse.t => unit), href, event) => {
  switch (onClick) {
  | Some(onClick) => onClick(event)
  | None => ()
  };
  if (!ReactEvent.Mouse.defaultPrevented(event)) {
    ReactEvent.Mouse.preventDefault(event);
    ReasonReact.Router.push(href);
  };
};

[@react.component]
let make =
    (
      ~className="",
      ~href,
      ~onClick: option(ReactEvent.Mouse.t => unit)=?,
      ~children,
    ) => {
      <a href onClick=handleClick(onClick, href) className>children</a>
};