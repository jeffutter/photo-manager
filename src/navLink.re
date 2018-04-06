let component = ReasonReact.statelessComponent("NavLink");

let make =
    (
      ~_to: string,
      ~className: option(string)=?,
      /* ~activeClassName: option(string)=?, */
      ~onClick: option(ReactEventRe.Mouse.t => unit)=?,
      children,
    ) => {
  ...component,
  render: _self => <Link href=_to ?className ?onClick> ...children </Link>,
};
