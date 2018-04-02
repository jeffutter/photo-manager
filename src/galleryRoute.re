[@bs.module "./routes/gallery/index.js"]
external galleryRoute : ReasonReact.reactClass = "default";

let make = (~_match, ~location=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=galleryRoute,
    ~props={"location": location, "match": _match},
    children,
  );