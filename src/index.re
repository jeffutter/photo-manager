[%bs.raw {|require('./index.css')|}];

[%bs.raw {|require('react-photoswipe/lib/photoswipe.css')|}];

external register_service_worker : unit => unit =
  "default" [@@bs.module "./registerServiceWorker"];

ReactDOMRe.renderToElementWithId <App /> "root";

register_service_worker ();
