[@bs.module "./registerServiceWorker"]
external register_service_worker : unit => unit = "default";

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