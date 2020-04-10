[@react.component]
let make =
    (
      ~_to: string,
      ~className: option(string)=?,
      ~onClick: option(ReactEvent.Mouse.t => unit)=?,
      ~children,
    ) => {
  <Link href=_to ?className ?onClick> children </Link>
};