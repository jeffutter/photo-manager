open Css;

[@bs.scope "Children"] [@bs.module "react"]
external count : array(ReasonReact.reactElement) => int = "";

let component = ReasonReact.statelessComponent("GalleryBody");

let cls =
  style([margin4(~top=px(0), ~right=auto, ~bottom=px(40), ~left=auto)]);

let make = children => {
  ...component,
  render: _self => {
    let imageWidth = 300;
    let baseGutter = 32;
    ReasonReact.element(
      InfiniteScroll.make(
        ~className=cls,
        ~pack=true,
        ~sizes=[|
          {"mq": "0px", "columns": 1, "gutter": baseGutter},
          {
            "mq": Js.Int.toString(2 * imageWidth + 3 * baseGutter) ++ "px",
            "columns": 2,
            "gutter": baseGutter,
          },
          {
            "mq": Js.Int.toString(3 * imageWidth + 4 * baseGutter) ++ "px",
            "columns": 3,
            "gutter": baseGutter,
          },
          {
            "mq": Js.Int.toString(4 * imageWidth + 5 * baseGutter) ++ "px",
            "columns": 4,
            "gutter": baseGutter,
          },
          {
            "mq": Js.Int.toString(5 * imageWidth + 6 * baseGutter) ++ "px",
            "columns": 5,
            "gutter": baseGutter,
          },
          {
            "mq": Js.Int.toString(5 * imageWidth + 6 * 2 * baseGutter) ++ "px",
            "columns": 5,
            "gutter": 2 * baseGutter,
          },
        |],
        children,
      ),
    );
  },
};
