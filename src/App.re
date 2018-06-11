open Css;

let cls =
  style([
    transition(~duration=400, ~timingFunction=`ease, "all"),
    transformStyle(`preserve3d),
    backfaceVisibility(hidden),
    position(absolute),
    width(`percent(100.0)),
    height(`percent(100.0)),
  ]);

type retainedProps = {path: string};

module Redirect = {
  let component = ReasonReact.statelessComponent("Redirect");
  let make = (~path, _children) => {
    ...component,
    didMount: _self => ReasonReact.Router.push(path),
    render: _self => <div />,
  };
};

type route =
  | Redirect(string)
  | LoginForm
  | Gallery(list(string));

type state = {route};

type action =
  | ChangeRoute(route);

let reducer = (action, _state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({route: route})
  };

let component = ReasonReact.reducerComponent("App");

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path, Cookies.loggedIn()) {
  | (["login"], false) => LoginForm
  | (_, false) => Redirect("/login")
  | (["gallery"], true) => Gallery(["root"])
  | (["gallery", ...rest], true) => Gallery(rest)
  | ([], true) => Redirect("/gallery")
  | _ => LoginForm
  };

let loadNextPage = (loadMore, slug, slugs) => {
  let loadMoreQuery = GalleryQueries.MoreQuery.make(~slug, ~slugs, ());
  ignore(loadMore(~variables=?Some(loadMoreQuery##variables), ()));
};

module Query = ReasonApollo.CreateQuery(GalleryQueries.GalleryQuery);

let make = _children => {
  ...component,
  reducer,
  subscriptions: self => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(url =>
          self.send(ChangeRoute(url |> mapUrlToRoute))
        ),
      ReasonReact.Router.unwatchUrl,
    ),
  ],
  initialState: () => {route: LoginForm},
  render: self =>
    <div id="app" className=cls>
      (
        switch (self.state.route) {
        | Redirect(path) => <Redirect path />
        | LoginForm => <LoginForm />
        | Gallery(slugs) =>
          let slug = Js.Array.joinWith("/", Array.of_list(slugs));
          let galleryQuery = GalleryQueries.GalleryQuery.make(~slug, ());
          <div>
            <Header />
            <Query variables=galleryQuery##variables>
              ...(
                   ({result}) =>
                     switch (result) {
                     | Loading =>
                       <GalleryContainer
                         gallery=None
                         moreGallery=None
                         loadNextPage=((_) => ())
                       />
                     | Error(_error) =>
                       <div>
                         (ReasonReact.string("Error Loading Gallery"))
                       </div>
                     | Data(result) =>
                       <LoadMoreWrapper slug>
                         ...(
                              (moreGallery, loadMore) =>
                                <GalleryContainer
                                  gallery=result##gallery
                                  moreGallery
                                  loadNextPage=(loadNextPage(loadMore, slug))
                                />
                            )
                       </LoadMoreWrapper>
                     }
                 )
            </Query>
          </div>;
        }
      )
    </div>,
};