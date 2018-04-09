[@bs.module "./registerServiceWorker"]
external register_service_worker : unit => unit = "default";

type raven;

[@bs.module "raven-js"] external ravenConfig : string => raven = "config";

[@bs.send] external ravenInstall : raven => unit = "install";

type config = {sentry_dsn: string};

module Decode = {
  let config = json =>
    Json.Decode.{sentry_dsn: json |> field("sentry_dsn", string)};
};

Js.Promise.(
  Fetch.fetch("/config")
  |> then_(Fetch.Response.text)
  |> then_(text => text |> Json.parseOrRaise |> Decode.config |> resolve)
  |> then_((config: config) => {
       let ravenConfig = ravenConfig(config.sentry_dsn);
       let _ = ravenInstall(ravenConfig);
       resolve();
     })
  |> catch(err => {
       Js.log2("Error loading Raven. Bad response from server", err);
       resolve();
     })
);

Css.(
  global(
    "body, html",
    [
      fontFamily("'Lato', sans-serif"),
      fontWeight(300),
      lineHeight(1.5),
      width(pct(100.0)),
      height(pct(100.0)),
      margin(px(0)),
      backgroundColor(hex("fafafa")),
      color(hex("333")),
    ],
  )
);

[%bs.raw {|require('react-photoswipe/dist/photoswipe.css')|}];

ReactDOMRe.renderToElementWithId(<App />, "root");

ReasonReact.Router.push("");

register_service_worker();