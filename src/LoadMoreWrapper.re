module Query = ReasonApollo.CreateQuery(GalleryQueries.MoreQuery);

type state = {slugs: Js.Array.t(string)};

type action =
  | Fetch(array(string));

let component = ReasonReact.reducerComponent("LoadMoreWrapper");

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
    <Query variables=loadMoreQuery##variables>
      ...(
           ({result}) => {
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