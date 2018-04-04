open Css;

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

let handleClickStar = (submitRating, slug, i, event) => {
  ReactEventRe.Mouse.stopPropagation(event);
  submitRating({"slug": slug, "rating": i});
};

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string),
      ~rating: option(int),
      ~handleOpen,
      ~submitRating,
    ) =>
  WaypointItem.make(
    ~w=320, ~h=295, ~onEnter?, ~name, ~slug, ~thumbnail?, ~rating?, ~render=() =>
    GalleryItem.make(
      ~lightBG=true,
      ~render=(wrapClass, detailsClass) => {
        let stars =
          switch (rating) {
          | Some(i) =>
            stars(i, 5, 1, handleClickStar(submitRating, slug), [])
          | None => stars(0, 5, 1, handleClickStar(submitRating, slug), [])
          };
        <div onClick=handleOpen className=wrapClass>
          (
            switch (thumbnail) {
            | Some(thumb) =>
              <img
                src=thumb
                className=(
                  style([
                    `declaration(("objectFit", "cover")),
                    display(block),
                  ])
                )
                width="300"
                height="225"
              />
            | None => <CircleLoader />
            }
          )
          <div className=detailsClass>
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
    )
  );