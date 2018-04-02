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
    transition(~duration=300, ~timingFunction=`easeInOut, "transform"),
    cursor(`pointer),
    `declaration(("counterIncrement", "item-counter")),
    selector(
      "@media screen and (min-width: 768px)",
      [selector(":hover", [transform(scale(1.05, 1.05))])],
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

let rec stars = (filled, total, index, handleClick, acc) =>
  filled > 0 ?
    stars(
      filled - 1,
      total - 1,
      index + 1,
      handleClick,
      [<Star filled=true index handleClick />, ...acc],
    ) :
    total > 0 ?
      stars(
        filled,
        total - 1,
        index + 1,
        handleClick,
        [<Star filled=false index handleClick />, ...acc],
      ) :
      List.rev(acc);

let component = ReasonReact.statelessComponent("GalleryImage");

let make =
    (
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string)=?,
      ~rating: option(int)=?,
      ~handleOpen,
      ~submitRating,
      ~innerRef: option(Js.Nullable.t(Dom.element) => unit)=?,
      _children,
    ) => {
  ...component,
  render: _self => {
    let handleClick = (i, event) => {
      ReactEventRe.Mouse.stopPropagation(event);
      submitRating({"slug": slug, "rating": i});
    };
    let stars =
      switch (rating) {
      | Some(i) => stars(i, 5, 1, handleClick, [])
      | None => stars(0, 5, 1, handleClick, [])
      };
    <div onClick=handleOpen ref=?innerRef className=cls>
      (
        switch (thumbnail) {
        | Some(thumb) =>
          <img
            src=thumb
            className=(
              style([`declaration(("objectFit", "cover")), display(block)])
            )
            width="300"
            height="225"
          />
        | None => <CircleLoader />
        }
      )
      <div className=detailsCls>
        <div> (ReasonReact.stringToElement(name)) </div>
        (
          ReasonReact.createDomElement(
            "div",
            ~props=Js.Obj.empty(),
            Array.of_list(stars),
          )
        )
      </div>
    </div>;
  },
};