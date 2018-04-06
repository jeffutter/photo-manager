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

module Redirect = {
  let component = ReasonReact.statelessComponent("Redirect");
  let make = (~path, _children) => {
    ...component,
    didMount: _self => {
      ReasonReact.Router.push(path);
      ReasonReact.NoUpdate;
    },
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
  | (_, false) => LoginForm
  | (["gallery"], true) => Gallery(["root"])
  | (["gallery", ...rest], true) => Gallery(rest)
  | ([], true) => Redirect("/gallery")
  | _ => LoginForm
  };

module Query = Client.Instance.Query;

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
            <Query query=galleryQuery>
              ...(
                   (response, parse) =>
                     switch (response) {
                     | Loading => <FullPageSpinner />
                     | Failed(error) =>
                       <div> (ReasonReact.stringToElement(error)) </div>
                     | Loaded(result) =>
                       let data = parse(result);
                       <LoadMoreWrapper slug>
                         ...(
                              (moreGallery, loadMore) =>
                                <GalleryContainer
                                  gallery=data##gallery
                                  moreGallery
                                  loadNextPage=loadMore
                                />
                            )
                       </LoadMoreWrapper>;
                     }
                 )
            </Query>
          </div>;
        }
      )
    </div>,
};