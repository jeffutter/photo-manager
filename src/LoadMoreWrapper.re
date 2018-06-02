module Query = ReasonApollo.CreateQuery(GalleryQueries.MoreQuery);

type state = {slugs: Js.Array.t(string)};

type action =
  | Fetch(array(string));

let component = ReasonReact.reducerComponent("LoadMoreWrapper");

let combine =
    (
      previousGallery: PhotoManager.GalleryQueries.MoreQuery.t,
      newGallery: PhotoManager.GalleryQueries.MoreQuery.t,
    )
    : PhotoManager.GalleryQueries.MoreQuery.t =>
  switch (previousGallery##gallery, newGallery##gallery) {
  | (Some(gallery), Some(moreGallery)) =>
    let newDescendants =
      switch (gallery##descendants, moreGallery##descendants) {
      | (None, None) => None
      | (Some(descendants), None) => Some(descendants)
      | (None, Some(descendants)) => Some(descendants)
      | (Some(oldDescendants), Some(newDescendants)) =>
        Some(Array.append(oldDescendants, newDescendants))
      };
    {
      "gallery":
        Some({
          "id": gallery##id,
          "name": gallery##name,
          "path": gallery##path,
          "slug": gallery##slug,
          "descendants": newDescendants,
        }),
    };
  | (Some(_), None) => previousGallery
  | (None, Some(_)) => newGallery
  | (None, None) => {"gallery": None}
  };

let updateQuery =
    (previousResults: PhotoManager.GalleryQueries.MoreQuery.t, updateQuery)
    : PhotoManager.GalleryQueries.MoreQuery.t =>
  switch (updateQuery##fetchMoreResult) {
  | Some(fetchMoreResults) => combine(fetchMoreResults, previousResults)
  | None => previousResults
  };

let make = (~slug: string, children) => {
  ...component,
  initialState: () => {slugs: [||]},
  reducer: (action, _state) =>
    switch (action) {
    | Fetch(slugs) => ReasonReact.Update({slugs: slugs})
    },
  render: self => {
    Js.log("Render load more wrapper");
    let loadMoreQuery =
      GalleryQueries.MoreQuery.make(~slug, ~slugs=self.state.slugs, ());
    <Query variables=loadMoreQuery##variables updateQuery>
      ...(
           ({result, fetchMore as _fetchMore}) => {
             let fMore = slugs => self.send(Fetch(slugs));
             switch (result) {
             | Loading =>
               <LoadMoreCache gallery=None>
                 ...(gallery => children(gallery, fMore))
               </LoadMoreCache>
             | Error(_error) =>
               <LoadMoreCache gallery=None>
                 ...(gallery => children(gallery, fMore))
               </LoadMoreCache>
             | Data(response) =>
               Js.log2("Result Gallery", response##gallery);
               <LoadMoreCache gallery=response##gallery>
                 ...(gallery => children(gallery, fMore))
               </LoadMoreCache>;
             };
           }
         )
    </Query>;
  },
};