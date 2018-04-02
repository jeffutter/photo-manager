[%bs.raw {|require('./index.css')|}];

[%bs.raw {|require('react-photoswipe/lib/photoswipe.css')|}];

[@bs.module "./registerServiceWorker"] external register_service_worker : unit => unit = "default";

ReactDOMRe.renderToElementWithId(<App />, "root");

ReasonReact.Router.push("");

register_service_worker();