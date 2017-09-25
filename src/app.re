external logout : unit => unit = "default" [@@bs.module "./lib/logout.js"];

external loggedIn : unit => bool = "" [@@bs.module "./lib/cookies.js"];

external client : 'a = "default" [@@bs.module "./lib/client.js"];

let styles: Js.t 'a = [%bs.raw "require('./components/style.scss')"];

module Logout = {
  let component = ReasonReact.statelessComponent "Logout";
  let make _children => {
    ...component,
    render: fun _self => {
      logout ();
      <Redirect _to="/" />
    }
  };
};

module AppWithHeader = {
  let component = ReasonReact.statelessComponent "AppWithHeader";
  let make children => {
    ...component,
    render: fun _self => {
      let header = ReasonReact.element (Header.make [||]);
      ignore (Js.Array.unshift header children);
      ReasonReact.createDomElement "div" props::{"className": styles##app} children
    }
  };
};

module GalleryRedirect = {
  let component = ReasonReact.statelessComponent "GalleryRedirect";
  let make _children => {...component, render: fun _self => <Redirect _to="/gallery" />};
};

module RouterBody = {
  let component = ReasonReact.statelessComponent "RouterBody";
  let make _children => {
    ...component,
    render: fun _self => {
      let createLoginForm _ => <LoginForm />;
      let createLogout _ => <Logout />;
      let createGalleryRedirect _ => <GalleryRedirect />;
      let createGallery jsProps => {
        Js.log jsProps;
        <GalleryRoute _match=jsProps##_match location=jsProps##location history=jsProps##history />
      };
      let routes = [|
        <Route key="1" exact=true path="/login" component=createLoginForm />,
        <Route key="2" exact=true path="/logout" component=createLogout />
      |];
      if (loggedIn ()) {
        ignore (
          Js.Array.push
            <AppWithHeader key="3">
              <Route path="/gallery/:slug?" component=createGallery />
              <Route exact=true path="/" component=createGalleryRedirect />
            </AppWithHeader>
            routes
        )
      } else {
        let redir = <Redirect key="3" from="/" _to="/login" />;
        ignore (Js.Array.push redir routes);
        Dom.Storage.setItem
          "loginFlash" "Your login has expired or is invalid." Dom.Storage.localStorage
      };
      ReasonReact.createDomElement "div" props::(Js.Obj.empty ()) routes
    }
  };
};

let component = ReasonReact.statelessComponent "App";

let make _children => {
  ...component,
  render: fun _self =>
    <ApolloProvider client> <BrowserRouter> <RouterBody /> </BrowserRouter> </ApolloProvider>
};

let default = ReasonReact.wrapReasonForJs ::component (fun _ => make [||]);
