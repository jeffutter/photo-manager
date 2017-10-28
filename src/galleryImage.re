open Glamor;

let component = ReasonReact.statelessComponent("GalleryImage");

let cls =
  css([
    width("300px"),
    maxWidth("300px"),
    position("inherit"), /* hack for react-waypoint */
    boxSizing("border-box"),
    color("#fff"),
    backgroundSize("cover"),
    backgroundPosition("center"),
    boxShadow("-2px 2px 10px 0 rgba(68,68,68,.4)"),
    transition("transform 0.3s ease-in-out"),
    cursor("pointer"),
    counterIncrement("item-counter"),
    Selector(
      "&:after",
      [
        content("''"),
        position("absolute"),
        top("0"),
        left("0"),
        width("100%"),
        height("100%"),
        backgroundColor("black"),
        opacity("0.2"),
        transition("opacity 0.3s ease-in-out")
      ]
    ),
    Selector("&:hover", [transform("scale(1.05)"), Selector("&:after", [opacity("0")])]),
    Selector("&--medium", [gridRowEnd("span 2")]),
    Selector("&--large", [gridRowEnd("span 3")]),
    Selector(
      "&--full",
      [
        gridColumnEnd("auto"),
        Selector("@media screen and (min-width 768px)", [gridColumn("1/-1"), gridRowEnd("span 2")])
      ]
    )
  ]);

let detailsCls =
  css([
    position("relative"),
    zIndex("1"),
    padding("15px"),
    color("#444"),
    background("#fff"),
    letterSpacing("1px"),
    color("#828282"),
    Selector(
      "&:before",
      [fontWeight("bold"), fontSize("1.1rem"), paddingRight("0.5em"), color("#444")]
    )
  ]);

let make =
    (
      ~name: string,
      ~thumbnail: option(string)=?,
      ~handleOpen,
      ~innerRef: option((Js.null(Dom.element) => unit))=?,
      _children
    ) => {
  ...component,
  render: (_self) =>
    <div onClick=handleOpen ref=?innerRef className=cls>
      (
        switch thumbnail {
        | Some(thumb) =>
          <img
            src=thumb
            className=(css([objectFit("cover"), display("block")]))
            width="300"
            height="225"
          />
        | None => <CircleLoader />
        }
      )
      <div className=detailsCls> (ReasonReact.stringToElement(name)) </div>
    </div>
};
