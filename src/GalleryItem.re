open Css;

let cls = lightBG =>
  style([
    width(px(300)),
    maxWidth(px(300)),
    `declaration(("position", "inherit")), /* hack for react-waypoint */
    boxSizing(borderBox),
    color(hex("fff")),
    backgroundSize(cover),
    `declaration(("backgroundPosition", "center")),
    boxShadow(
      ~x=px(-2),
      ~y=px(2),
      ~blur=px(10),
      ~spread=px(0),
      rgba(68, 68, 68, 0.4),
    ),
    transition(~duration=300, ~timingFunction=`easeInOut, "transform"),
    cursor(`pointer),
    `declaration(("counterIncrement", "item-counter")),
    selector(
      "@media screen and (min-width: 768px)",
      [selector(":hover", [transform(scale(1.05, 1.05))])],
    ),
    selector(
      "&:after",
      lightBG ?
        [] :
        [
          `declaration(("content", "''")),
          position(absolute),
          top(zero),
          left(zero),
          width(`percent(100.0)),
          height(`percent(100.0)),
          backgroundColor(black),
          opacity(0.2),
          transition("opacity 0.3s ease-in-out"),
        ],
    ),
  ]);

let detailsCls =
  style([
    position(relative),
    zIndex(1),
    padding2(~v=px(10), ~h=px(15)),
    color(hex("444")),
    background(hex("fff")),
    letterSpacing(px(1)),
    color(hex("828282")),
    selector(
      "&:before",
      [
        `declaration(("fontWeight", "bold")),
        fontSize(rem(1.1)),
        paddingRight(em(0.5)),
        color(hex("444")),
      ],
    ),
  ]);

let component = ReasonReact.statelessComponent("GalleryItem");

let make = (~lightBG=true, children) => {
  ...component,
  render: _ => children(cls(lightBG), detailsCls),
};
