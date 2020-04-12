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
  let make = (~path) => {
    ...component,
    didMount: _self => ReasonReact.Router.push(path),
    render: _self => <div />,
  };
  /**
 * This is a wrapper created to let this component be used from the new React api.
 * Please convert this component to a [@react.component] function and then remove this wrapping code.
 */
  let make =
    ReasonReactCompat.wrapReasonReactForReact(
      ~component, (reactProps: {. "path": 'path}) =>
      make(~path=reactProps##path)
    );
  [@bs.obj]
  external makeProps: (~path: 'path, unit) => {. "path": 'path} = "";
};

type route =
  | Redirect(string)
  | LoginForm
  | Gallery(list(string));

type state = {route};

type action =
  | ChangeRoute(route);

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path, Cookies.loggedIn()) {
  | (["login"], false) => LoginForm
  | (_, false) => Redirect("/login")
  | (["gallery"], true) => Gallery(["root"])
  | (["gallery", ...rest], true) => Gallery(rest)
  | ([], true) => Redirect("/gallery")
  | _ => LoginForm
  };

type loadMoreOptions =
  (~variables: option(Js.Json.t), unit) => Js.Promise.t(unit);

let loadNextPage =
    (loadMore: loadMoreOptions, slug: string, slugs: array(string)) => {
  let loadMoreQuery = GalleryQueries.MoreQuery.make(~slug, ~slugs, ());
  loadMore(~variables=Some(loadMoreQuery##variables), ()) |> ignore;
};

module Query = ReasonApollo.CreateQuery(GalleryQueries.GalleryQuery);

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();
  let route = mapUrlToRoute(url);

  <div id="app" className=cls>
    {switch (route) {
     | Redirect(path) => <Redirect path />
     | LoginForm => <LoginForm />
     | Gallery(slugs) =>
       let slug = Js.Array.joinWith("/", Array.of_list(slugs));
       let galleryQuery = GalleryQueries.GalleryQuery.make(~slug, ());
       <div>
         <Header />
         <Query variables=galleryQuery##variables>
           ...{({result}) =>
             switch (result) {
             | Loading =>
               <GalleryContainer
                 gallery=None
                 moreGallery=None
                 loadNextPage={_ => ()}
               />
             | Error(_error) =>
               <div> {React.string("Error Loading Gallery")} </div>
             | Data(result) =>
               <LoadMoreWrapper slug>
                 ...{(moreGallery, loadMore) =>
                   <GalleryContainer
                     gallery=result##gallery
                     moreGallery
                     loadNextPage={loadNextPage(loadMore, slug)}
                   />
                 }
               </LoadMoreWrapper>
             }
           }
         </Query>
       </div>;
     }}
  </div>;
};