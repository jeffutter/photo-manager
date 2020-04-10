open Css;

let cls = lightBG => {
  let base = [
    display(block),
    width(px(300)),
    maxWidth(px(300)),
    unsafe("position", "inherit"), /* hack for react-waypoint */
    boxSizing(borderBox),
    color(hex("fff")),
    backgroundSize(cover),
    unsafe("backgroundPosition", "center"),
    boxShadow(
      Shadow.box(
        ~x=px(-2),
        ~y=px(2),
        ~blur=px(10),
        ~spread=px(0),
        rgba(68, 68, 68, 0.4),
      ),
    ),
    transition(~duration=300, ~timingFunction=`easeInOut, "transform"),
    cursor(`pointer),
    unsafe("counterIncrement", "item-counter"),
    selector(
      "@media screen and (min-width: 768px)",
      [selector(":hover", [transform(scale(1.05, 1.05))])],
    ),
  ];
  let black = [backgroundColor(hex("ccc"))];
  (lightBG ? base : List.append(base, black)) |> style;
};

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
        unsafe("fontWeight", "bold"),
        fontSize(rem(1.1)),
        paddingRight(em(0.5)),
        color(hex("444")),
      ],
    ),
  ]);

[@react.component]
let make = (~lightBG=true, ~children) => {
  children(cls(lightBG), detailsCls);
};