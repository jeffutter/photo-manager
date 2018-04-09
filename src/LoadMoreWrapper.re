module Query = Client.Instance.Query;

external castResponse : string => {. "data": Js.Json.t} =
  "GalleryQueries.MoreQuery.t";

type state = {gallery: option(GalleryQueries.moreGallery)};

type action =
  | Fetch(array(string))
  | AddResults(option(GalleryQueries.moreGallery));

let component = ReasonReact.reducerComponent("LoadMoreWrapper");

let make = (~slug: string, children) => {
  ...component,
  initialState: () => {gallery: None},
  reducer: (action, state) =>
    switch (action) {
    | Fetch(slugs) =>
      ReasonReact.SideEffects(
        (
          ({send}) => {
            let moreQuery = GalleryQueries.MoreQuery.make(~slug, ~slugs, ());
            Query.sendQuery(
              ~query=moreQuery,
              ~reduce=(rd: unit => Query.action, ()) => {
                let action = rd();
                switch (action) {
                | Query.Result(result) =>
                  let response = Query.castResponse(result)##data;
                  let parse = moreQuery##parse;
                  let parsed = parse(response);
                  send(AddResults(parsed##gallery));
                  ();
                | Query.Error(_string) => ()
                };
              },
            );
          }
        ),
      )
    | AddResults(Some(moreGallery)) =>
      switch (state.gallery) {
      | None => ReasonReact.Update({gallery: Some(moreGallery)})
      | Some(gallery) =>
        let newDescendants =
          switch (gallery##descendants, moreGallery##descendants) {
          | (None, None) => None
          | (Some(descendants), None) => Some(descendants)
          | (None, Some(descendants)) => Some(descendants)
          | (Some(oldDescendants), Some(newDescendants)) =>
            Some(Array.append(oldDescendants, newDescendants))
          };
        let newGallery = {
          "id": gallery##id,
          "name": gallery##name,
          "path": gallery##path,
          "slug": gallery##slug,
          "descendants": newDescendants,
        };
        ReasonReact.Update({gallery: Some(newGallery)});
      }
    | AddResults(None) => ReasonReact.NoUpdate
    },
  didMount: self => {
    self.send(Fetch([||]));
    ReasonReact.NoUpdate;
  },
  render: self =>
    children(self.state.gallery, slugs => self.send(Fetch(slugs))),
};
