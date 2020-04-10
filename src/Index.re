[@bs.module "./registerServiceWorker"]
external registerServiceWorker: unit => unit = "register";

type config = {sentry_dsn: string};

module Decode = {
  let config = json =>
    Json.Decode.{sentry_dsn: json |> field("sentry_dsn", string)};
};

module type RavenType = (module type of Raven);

DynamicImport.(
  import("./Raven.bs.js")
  |> resolve
  <$> (
    (module Raven: RavenType) => {
      Fetch.fetch("/config")
      |> Js.Promise.then_(Fetch.Response.text)
      |> Js.Promise.then_(text =>
           text |> Json.parseOrRaise |> Decode.config |> Js.Promise.resolve
         )
      |> Js.Promise.then_((config: config) => {
           Raven.setup(config.sentry_dsn);
           Js.Promise.resolve();
         })
      |> Js.Promise.catch(err => {
           Js.log2("Error loading Raven. Bad response from server", err);
           Js.Promise.resolve();
         })
      |> ignore;
      ();
    }
  )
  <$!> (error => Js.log(error))
);

Css.(
  global(
    "body, html",
    [
      fontFamily(`custom("'Lato', sans-serif")),
      fontWeight(`num(300)),
      lineHeight(`abs(1.5)),
      width(pct(100.0)),
      height(pct(100.0)),
      margin(px(0)),
      backgroundColor(hex("fafafa")),
      color(hex("333")),
    ],
  )
);

[%bs.raw {|require('react-photoswipe/dist/photoswipe.css')|}];

ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client=Client.instance>
    <App />
  </ReasonApollo.Provider>,
  "app-root",
);

ReasonReact.Router.push("");

registerServiceWorker();