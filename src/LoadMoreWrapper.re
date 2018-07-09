module Query = ReasonApollo.CreateQuery(GalleryQueries.MoreQuery);

let component = ReasonReact.statelessComponent("LoadMoreWrapper");

type responseJS = {
  .
  "gallery":
    Js.Nullable.t(
      {
        .
        "id": string,
        "name": string,
        "path": Js.Array.t(string),
        "slug": string,
        "descendants": Js.Nullable.t(Js.Array.t(Js.t({.}))),
        "__typename": string,
      },
    ),
};

external unsafeFromJson : Js.Json.t => responseJS = "%identity";

external unsafeToJson : responseJS => Js.Json.t = "%identity";

let updateQuery = (previousResult, newResults: Query.updateQueryOptions) => {
  let previousResult = unsafeFromJson(previousResult);
  (
    switch (newResults |. Query.fetchMoreResultGet) {
    | Some(fetchMoreResult) =>
      let fetchMoreResult = unsafeFromJson(fetchMoreResult);
      let combinedGallery =
        switch (
          previousResult##gallery |> Js.Nullable.toOption,
          fetchMoreResult##gallery |> Js.Nullable.toOption,
        ) {
        | (Some(previousGallery), Some(moreGallery)) =>
          let combinedDescendants =
            switch (
              previousGallery##descendants |> Js.Nullable.toOption,
              moreGallery##descendants |> Js.Nullable.toOption,
            ) {
            | (Some(previousDescendants), Some(moreDescendants)) =>
              Some(Array.append(previousDescendants, moreDescendants))
            | (Some(previousDescendants), None) => Some(previousDescendants)
            | (None, Some(moreDescendants)) => Some(moreDescendants)
            | (None, None) => Some([||])
            };
          Some({
            "id": previousGallery##id,
            "name": previousGallery##name,
            "path": previousGallery##path,
            "slug": previousGallery##slug,
            "descendants": combinedDescendants |> Js.Nullable.fromOption,
            "__typename": previousGallery##__typename,
          });
        | (Some(previousGallery), None) => Some(previousGallery)
        | (None, Some(moreGallery)) => Some(moreGallery)
        | (None, None) => None
        };
      {"gallery": combinedGallery |> Js.Nullable.fromOption};
    | None => {"gallery": Js.Nullable.null}
    }
  )
  |> unsafeToJson;
};

let make = (~slug: string, children) => {
  ...component,
  render: _self => {
    let loadMoreQuery = GalleryQueries.MoreQuery.make(~slug, ~slugs=[||], ());
    <Query variables=loadMoreQuery##variables>
      ...(
           ({result, fetchMore}) =>
             switch (result) {
             | Loading => children(None, fetchMore(~updateQuery))
             | Error(_error) => children(None, fetchMore(~updateQuery))
             | Data(response) =>
               children(response##gallery, fetchMore(~updateQuery))
             }
         )
    </Query>;
  },
};