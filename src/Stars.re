module Mutation = ReasonApollo.CreateMutation(GalleryQueries.RateImage);

let rec stars5 = (filled, total, index, handleClick, acc) =>
  filled > 0
    ? stars5(
        filled - 1,
        total - 1,
        index + 1,
        handleClick,
        [<Star filled=true index handleClick />, ...acc],
      )
    : total > 0
        ? stars5(
            filled,
            total - 1,
            index + 1,
            handleClick,
            [<Star filled=false index handleClick />, ...acc],
          )
        : Array.of_list(List.rev(acc));

let handleClickStar =
    (
      mutation: Mutation.apolloMutation,
      slug: string,
      i: int,
      event: ReactEvent.Mouse.t,
    )
    : unit => {
  ReactEvent.Mouse.stopPropagation(event);
  let ratingMutation = GalleryQueries.RateImage.make(~slug, ~rating=i, ());
  mutation(~variables=ratingMutation##variables, ()) |> ignore;
};

let stars = (rating, handleClick) =>
  switch (rating) {
  | Some(rating) => stars5(rating, 5, 1, handleClick, [])
  | None => stars5(0, 5, 1, handleClick, [])
  };

[@react.component]
let make = (~slug: string, ~rating: option(int)) => {
  <Mutation>
    ...{(mutation, {result}) => {
      let rating =
        switch (result) {
        | NotCalled => rating
        | Loading => rating
        | Error(_error) => rating
        | Data(response) =>
          switch (response##rateImage) {
          | Some(img) => img##rating
          | None => rating
          }
        };

      <div>
        {React.array(stars(rating, handleClickStar(mutation, slug)))}
      </div>;
    }}
  </Mutation>;
};