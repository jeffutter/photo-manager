open Glamor;

external count : array ReasonReact.reactElement => int =
  "" [@@bs.scope "Children"] [@@bs.module "react"];

let component = ReasonReact.statelessComponent "GalleryBody";

let cls = css [margin "0 auto 40px auto"];

let make children => {
  ...component,
  render: fun _self => {
    let imageWidth = 300;
    let baseGutter = 32;
    ReasonReact.element (
      InfiniteScroll.make
        className::cls
        pack::true
        sizes::[|
          {"mq": "0px", "columns": 1, "gutter": baseGutter},
          {
            "mq": Js.Int.toString (2 * imageWidth + 3 * baseGutter) ^ "px",
            "columns": 2,
            "gutter": baseGutter
          },
          {
            "mq": Js.Int.toString (3 * imageWidth + 4 * baseGutter) ^ "px",
            "columns": 3,
            "gutter": baseGutter
          },
          {
            "mq": Js.Int.toString (4 * imageWidth + 5 * baseGutter) ^ "px",
            "columns": 4,
            "gutter": baseGutter
          },
          {
            "mq": Js.Int.toString (5 * imageWidth + 6 * baseGutter) ^ "px",
            "columns": 5,
            "gutter": baseGutter
          },
          {
            "mq": Js.Int.toString (5 * imageWidth + 6 * 2 * baseGutter) ^ "px",
            "columns": 5,
            "gutter": 2 * baseGutter
          }
        |]
        children
    )
  }
};

let default = ReasonReact.wrapReasonForJs ::component (fun jsProps => make jsProps##children);
