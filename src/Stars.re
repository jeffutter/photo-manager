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

let component = ReasonReact.statelessComponent("Stars");

let make = (~slug: string, ~rating: option(int), _children) => {
  ...component,
  render: (_) =>
    <Mutation>
      ...(
           (mutate, result) => {
             let ratingMutation = GalleryQueries.RateImage.make(~slug);
             let rating =
               switch (result) {
               | NotCalled => rating
               | Loading => rating
               | Failed(_error) => rating
               | Loaded(response) =>
                 let parse = ratingMutation(~rating=0, ())##parse;
                 switch (parse(response)##rateImage) {
                 | Some(img) => img##rating
                 | None => rating
                 };
               };
             ReasonReact.createDomElement(
               "div",
               ~props=Js.Obj.empty(),
               Array.of_list(
                 stars(rating, handleClickStar(ratingMutation, mutate)),
               ),
             );
           }
         )
    </Mutation>,
};