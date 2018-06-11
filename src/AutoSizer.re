[@bs.module "react-virtualized"]
external autoSizer : ReasonReact.reactClass = "AutoSizer";

[@bs.deriving abstract]
type size = {
  height: int,
  width: int,
};

let make =
    (
      ~className: option(string)=?,
      ~defaultHeight: option(string)=?,
      ~defaultWidth: option(string)=?,
      ~disableHeight: bool=false,
      ~disableWidth: bool=false,
      children: size => ReasonReact.reactElement,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=autoSizer,
    ~props={
      "className": Js.Nullable.fromOption(className),
      "defaultHeight": Js.Nullable.fromOption(defaultHeight),
      "defaultWidth": Js.Nullable.fromOption(defaultWidth),
      "disableHeight": disableHeight,
      "disableWidth": disableWidth,
    },
    children,
  );
