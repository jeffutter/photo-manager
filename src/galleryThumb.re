open Css;

let cls =
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
    transition("transform 0.3s ease-in-out"),
    cursor(`pointer),
    `declaration(("counterIncrement", "item-counter")),
    selector(
      "@media screen and (min-width: 768px)",
      [selector(":hover", [transform(scale(1.05, 1.05))])],
    ),
    selector(
      "&:after",
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

let component = ReasonReact.statelessComponent("GalleryThumb");

let make =
    (
      ~name: string,
      ~slug: string,
      ~innerRef: option(Js.Nullable.t(Dom.element) => unit)=?,
      _children,
    ) => {
  ...component,
  render: _self => {
    let link = "/gallery/" ++ slug;
    <ReactRouterDom.NavLink _to=link className=cls ?innerRef>
      <svg
        viewBox="0 0 8 8"
        width="200px"
        height="200px"
        className=(
          style([
            margin2(~v=px(0), ~h=auto),
            padding(px(8)),
            display(block),
          ])
        )>
        <path
          d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
          id="folder"
        />
      </svg>
      <div className=detailsCls> (ReasonReact.stringToElement(name)) </div>
    </ReactRouterDom.NavLink>;
  },
};