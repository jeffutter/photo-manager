open Css;

[@bs.module "./lib/client.js"] external client : 'a = "default";

let cls =
  style([
    transition(~duration=400, ~timingFunction=`ease, "all"),
    transformStyle(`preserve3d),
    backfaceVisibility(hidden),
    position(absolute),
    width(`percent(100.0)),
    height(`percent(100.0)),
  ]);

module Logout = {
  let component = ReasonReact.statelessComponent("Logout");
  let make = _children => {
    ...component,
    render: _self => {
      Cookies.logOut();
      <ReactRouterDom.Redirect _to="/" />;
    },
  };
};

module GalleryRedirect = {
  let component = ReasonReact.statelessComponent("GalleryRedirect");
  let make = _children => {
    ...component,
    render: _self => <ReactRouterDom.Redirect _to="/gallery" />,
  };
};

let routerBody = () => {
  let createLoginForm = (_) => <LoginForm />;
  let createLogout = (_) => <Logout />;
  let createGalleryRedirect = (_) => <GalleryRedirect />;
  let createGallery = jsProps =>
    <GalleryRoute
      _match=jsProps##_match
      location=jsProps##location
      history=jsProps##history
    />;
  let routes = [|
    <ReactRouterDom.Route
      key="1"
      exact=true
      path="/login"
      component=createLoginForm
    />,
    <ReactRouterDom.Route
      key="2"
      exact=true
      path="/logout"
      component=createLogout
    />,
  |];
  if (Cookies.loggedIn()) {
    ignore(Js.Array.push(<Header />, routes));
    ignore(
      Js.Array.push(
        <ReactRouterDom.Route
          path="/gallery/:slug?"
          component=createGallery
        />,
        routes,
      ),
    );
    ignore(
      Js.Array.push(
        <ReactRouterDom.Route
          exact=true
          path="/"
          component=createGalleryRedirect
        />,
        routes,
      ),
    );
  } else {
    let redir = <ReactRouterDom.Redirect key="3" from="/" _to="/login" />;
    ignore(Js.Array.push(redir, routes));
    Dom.Storage.setItem(
      "loginFlash",
      "Your login has expired or is invalid.",
      Dom.Storage.localStorage,
    );
  };
  routes;
};

let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    ReasonReact.element(
      ApolloProvider.make(
        ~client,
        [|
          ReasonReact.element(
            ReactRouterDom.BrowserRouter.make([|
              ReasonReact.createDomElement(
                "div",
                ~props={"id": "app", "className": cls},
                routerBody(),
              ),
            |]),
          ),
        |],
      ),
    ),
};