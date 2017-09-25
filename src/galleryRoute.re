external galleryRoute : ReasonReact.reactClass =
  "default" [@@bs.module "./routes/gallery/index.js"];

let make ::_match ::location ::history children =>
  ReasonReact.wrapJsForReason
    reactClass::galleryRoute
    props::{"location": location, "history": history, "match": _match}
    children;
