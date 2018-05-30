type state = {gallery: option(GalleryQueries.moreGallery)};

type action =
  | Noop;

let component = ReasonReact.reducerComponent("LoadMoreCache");

let combine = (gallery, moreGallery) => {
  let newDescendants =
    switch (gallery##descendants, moreGallery##descendants) {
    | (None, None) => None
    | (Some(descendants), None) => Some(descendants)
    | (None, Some(descendants)) => Some(descendants)
    | (Some(oldDescendants), Some(newDescendants)) =>
      Some(Array.append(oldDescendants, newDescendants))
    };
  {
    "id": gallery##id,
    "name": gallery##name,
    "path": gallery##path,
    "slug": gallery##slug,
    "descendants": newDescendants,
  };
};

let make = (~gallery: option(GalleryQueries.moreGallery), children) => {
  ...component,
  initialState: () => {gallery: gallery},
  reducer: (action, _state) =>
    switch (action) {
    | Noop => ReasonReact.NoUpdate
    },
  willReceiveProps: ({state}) => {
    Js.log2("Prop Gallery", gallery);
    switch (state.gallery, gallery) {
    | (Some(oldGallery), Some(newGallery)) =>
      /* Js.log("Found Both"); */
      if (oldGallery != newGallery) {
        let combined = combine(oldGallery, newGallery);
        /* Js.log("#########"); */
        /* Js.log2("combined", combined); */
        /* Js.log("#########"); */
        {gallery: Some(combined)};
      } else {
        state;
      }
    | (Some(oldGallery), None) =>
      /* Js.log("Found Old"); */
      {gallery: Some(oldGallery)}
    | (None, Some(newGallery)) =>
      /* Js.log("Found New"); */
      {gallery: Some(newGallery)}
    | (None, None) =>
      /* Js.log("Found Neither"); */
      {gallery: None}
    };
  },
  render: self => children(self.state.gallery),
};