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
        "descendants":
          Js.Nullable.t(
            Js.Array.t(
              [
                | `Gallery(
                    {
                      .
                      "__typename": string,
                      "id": string,
                      "name": string,
                      "path": Js.Array.t(string),
                      "slug": string,
                    },
                  )
                | `Image(
                    {
                      .
                      "__typename": string,
                      "id": string,
                      "name": string,
                      "path": Js.Array.t(string),
                      "slug": string,
                      "thumbnail": option(string),
                    },
                  )
              ],
            ),
          ),
        "__typename": string,
      },
    ),
};

external unsafeFromJson : Js.Json.t => responseJS = "%identity";

external unsafeToJson : responseJS => Js.Json.t = "%identity";

let updateQuery =
    (
      previousResult: PhotoManager.GalleryQueries.MoreQuery.t,
      newResults: Query.updateQueryOptions,
    ) =>
  (
    switch (newResults |. Query.fetchMoreResult) {
    | Some(fetchMoreResult) =>
      let combinedGallery =
        switch (previousResult##gallery, fetchMoreResult##gallery) {
        | (Some(previousGallery), Some(moreGallery)) =>
          let combinedDescendants =
            switch (previousGallery##descendants, moreGallery##descendants) {
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
        | (Some(previousGallery), None) =>
          Some({
            "id": previousGallery##id,
            "name": previousGallery##name,
            "path": previousGallery##path,
            "slug": previousGallery##slug,
            "descendants":
              previousGallery##descendants |> Js.Nullable.fromOption,
            "__typename": previousGallery##__typename,
          })
        | (None, Some(moreGallery)) =>
          Some({
            "id": moreGallery##id,
            "name": moreGallery##name,
            "path": moreGallery##path,
            "slug": moreGallery##slug,
            "descendants": moreGallery##descendants |> Js.Nullable.fromOption,
            "__typename": moreGallery##__typename,
          })
        | (None, None) => None
        };
      {"gallery": combinedGallery |> Js.Nullable.fromOption};
    | None => {"gallery": Js.Nullable.null}
    }
  )
  |> unsafeToJson;

let make = (~slug: string, children) => {
  ...component,
  render: _self => {
    Js.log("Render load more wrapper");
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