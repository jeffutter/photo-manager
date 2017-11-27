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
      "@media screen and (min-width: 768px)",
      [Selector(":hover", [transform("scale(1.05)")])]
    )
  ]);

let detailsCls =
  css([
    position("relative"),
    zIndex("1"),
    padding("10px 15px"),
    color("#444"),
    background("#fff"),
    letterSpacing("1px"),
    color("#828282"),
    Selector(
      "&:before",
      [fontWeight("bold"), fontSize("1.1rem"), paddingRight("0.5em"), color("#444")]
    )
  ]);

let rec stars = (filled, total, index, handleClick, acc) =>
  filled > 0 ?
    stars(
      filled - 1,
      total - 1,
      index + 1,
      handleClick,
      [<Star filled=true index handleClick />, ...acc]
    ) :
    total > 0 ?
      stars(
        filled,
        total - 1,
        index + 1,
        handleClick,
        [<Star filled=false index handleClick />, ...acc]
      ) :
      List.rev(acc);

let make =
    (
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string)=?,
      ~rating: option(int)=?,
      ~handleOpen,
      ~submitRating,
      ~innerRef: option((Js.Nullable.t(Dom.element) => unit))=?,
      _children
    ) => {
  ...component,
  render: (_self) => {
    let handleClick = (i, event) => {
      ReactEventRe.Mouse.stopPropagation(event);
      submitRating({"slug": slug, "rating": i})
    };
    let stars =
      switch rating {
      | Some(i) => stars(i, 5, 1, handleClick, [])
      | None => stars(0, 5, 1, handleClick, [])
      };
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
      <div className=detailsCls>
        <div> (ReasonReact.stringToElement(name)) </div>
        (ReasonReact.createDomElement("div", ~props=Js.Obj.empty(), Array.of_list(stars)))
      </div>
    </div>
  }
};