open Css;

let rec stars5 = (filled, total, index, handleClick, acc) =>
  filled > 0 ?
    stars5(
      filled - 1,
      total - 1,
      index + 1,
      handleClick,
      [<Star filled=true index handleClick />, ...acc],
    ) :
    total > 0 ?
      stars5(
        filled,
        total - 1,
        index + 1,
        handleClick,
        [<Star filled=false index handleClick />, ...acc],
      ) :
      List.rev(acc);

let handleClickStar = (ratingMutation, mutate, i, event) => {
  ReactEventRe.Mouse.stopPropagation(event);
  let mutation = ratingMutation(~rating=i, ());
  mutate(mutation);
};

let stars = (rating, handleClick) =>
  switch (rating) {
  | Some(rating) => stars5(rating, 5, 1, handleClick, [])
  | None => stars5(0, 5, 1, handleClick, [])
  };

module Mutation = Client.Instance.Mutation;

let component = ReasonReact.statelessComponent("GalleryItem");

let imgCls = style([`declaration(("objectFit", "cover")), display(block)]);

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string),
      ~rating: option(int),
      ~handleOpen,
      _children,
    ) => {
  ...component,
  render: (_) =>
    <WaypointItem w=320 h=295 ?onEnter name slug ?thumbnail ?rating>
      ...(
           () =>
             <GalleryItem lightBG=true>
               ...(
                    (wrapClass, detailsClass) =>
                      <div onClick=handleOpen className=wrapClass>
                        (
                          switch (thumbnail) {
                          | Some(thumb) =>
                            <img
                              src=thumb
                              className=imgCls
                              width="300"
                              height="225"
                            />
                          | None => <CircleLoader />
                          }
                        )
                        <div className=detailsClass>
                          <div> (ReasonReact.stringToElement(name)) </div>
                          <Mutation>
                            ...(
                                 (mutate, result) => {
                                   let ratingMutation =
                                     GalleryQueries.RateImage.make(~slug);
                                   let rating =
                                     switch (result) {
                                     | NotCalled => rating
                                     | Loading => rating
                                     | Failed(_error) => rating
                                     | Loaded(response) =>
                                       let parse = ratingMutation(
                                                     ~rating=0,
                                                     (),
                                                   )##parse;
                                       switch (parse(response)##rateImage) {
                                       | Some(img) => img##rating
                                       | None => rating
                                       };
                                     };
                                   ReasonReact.createDomElement(
                                     "div",
                                     ~props=Js.Obj.empty(),
                                     Array.of_list(
                                       stars(
                                         rating,
                                         handleClickStar(
                                           ratingMutation,
                                           mutate,
                                         ),
                                       ),
                                     ),
                                   );
                                 }
                               )
                          </Mutation>
                        </div>
                      </div>
                  )
             </GalleryItem>
         )
    </WaypointItem>,
};