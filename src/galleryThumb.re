open Glamor;

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

let component = ReasonReact.statelessComponent("GalleryThumb");

let make =
    (~name: string, ~slug: string, ~innerRef: option((Js.null(Dom.element) => unit))=?, _children) => {
  ...component,
  render: (_self) => {
    let link = "/gallery/" ++ slug;
    <ReactRouterDom.NavLink _to=link className=cls ?innerRef>
      <svg
        viewBox="0 0 8 8"
        width="200px"
        height="200px"
        className=(css([margin("0 auto"), padding("8px"), display("block")]))>
        <path
          d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
          id="folder"
        />
      </svg>
      <div className=detailsCls> (ReasonReact.stringToElement(name)) </div>
    </ReactRouterDom.NavLink>
  }
};
