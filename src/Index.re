[@bs.module "./registerServiceWorker"]
external registerServiceWorker: unit => unit = "register";

type conf = {sentry_dsn: string};

module Decode = {
  let conf = json =>
    Json.Decode.{sentry_dsn: json |> field("sentry_dsn", string)};
};

Webapi.Dom.(
  window
  |> Window.addEventListener("load", _ =>
       Fetch.fetch("/config")
       |> Js.Promise.then_(Fetch.Response.text)
       |> Js.Promise.then_(text =>
            text |> Json.parseOrRaise |> Decode.conf |> Js.Promise.resolve
          )
       |> Js.Promise.then_((conf: conf) => {
            Sentry.init(~dsn=conf.sentry_dsn);
            Js.Promise.resolve();
          })
       |> Js.Promise.catch(err => {
            Js.log2("Error loading Sentry. Bad response from server", err);
            Js.Promise.resolve();
          })
       |> ignore
     )
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