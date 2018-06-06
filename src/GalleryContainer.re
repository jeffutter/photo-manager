open Css;

let component = ReasonReact.statelessComponent("GalleryContainer");

let contains = (~value: 'a, theList: array('a)) => {
  let f = (found, elem) => found || elem == value;
  Array.fold_left(f, false, theList);
};

let cls =
  style([
    padding4(~top=px(56), ~right=px(8), ~bottom=px(8), ~left=px(8)),
    position(absolute),
    width(`percent(100.0)),
    height(`percent(100.0)),
    boxSizing(borderBox),
  ]);

let findDescendantInDescendants =
    (
      descendant: GalleryQueries.descendant,
      descendants: GalleryQueries.moreDescendants,
    ) => {
  let foundIndex =
    Js.Array.findIndex(
      moreDescendant =>
        switch (descendant, moreDescendant) {
        | (`Gallery(gallery), `Gallery(moreGallery)) =>
          gallery##id == moreGallery##id
        | (`Image(image), `Image(moreImage)) => image##id == moreImage##id
        | _ => false
        },
      descendants,
    );
  switch (foundIndex) {
  | index when index >= 0 =>
    let foundDescendant = descendants[index];
    Some(foundDescendant);
  | _ => None
  };
};

let mergeGallery =
    (
      _gallery: GalleryQueries.galleryNoDescendants,
      gallery: GalleryQueries.galleryNoDescendants,
    )
    : GalleryQueries.galleryNoDescendants => gallery;

let mergeImage =
    (image: GalleryQueries.image, moreImage: GalleryQueries.moreImage)
    : GalleryQueries.completeImage => {
  "id": image##id,
  "__typename": image##__typename,
  "name": image##name,
  "path": image##path,
  "slug": image##slug,
  "size": image##size,
  "width": image##width,
  "height": image##height,
  "rating": image##rating,
  "smallUrl": image##smallUrl,
  "mediumUrl": image##mediumUrl,
  "largeUrl": image##largeUrl,
  "thumbnail": moreImage##thumbnail,
};

let convertGallery =
    (gallery: GalleryQueries.galleryNoDescendants)
    : GalleryQueries.galleryNoDescendants => gallery;

let convertImage =
    (image: GalleryQueries.image)
    : GalleryQueries.completeImage => {
  "id": image##id,
  "__typename": image##__typename,
  "name": image##name,
  "path": image##path,
  "slug": image##slug,
  "size": image##size,
  "width": image##width,
  "height": image##height,
  "rating": image##rating,
  "smallUrl": image##smallUrl,
  "mediumUrl": image##mediumUrl,
  "largeUrl": image##largeUrl,
  "thumbnail": None,
};

let noMatchCompleteChild =
    (descendant: GalleryQueries.descendant)
    : GalleryQueries.completeDescendant =>
  switch (descendant) {
  | `Image(image) => `CompleteImage(convertImage(image))
  | `Gallery(gallery) => `CompleteGallery(convertGallery(gallery))
  };

let completeChild =
    (
      descendant: GalleryQueries.descendant,
      descendants: option(GalleryQueries.moreDescendants),
    )
    : GalleryQueries.completeDescendant =>
  switch (descendants) {
  | None => noMatchCompleteChild(descendant)
  | Some(descendants) =>
    let foundDescendant =
      findDescendantInDescendants(descendant, descendants);
    switch (foundDescendant) {
    | None => noMatchCompleteChild(descendant)
    | Some(foundDescendant) =>
      switch (descendant, foundDescendant) {
      | (`Gallery(gallery), `Gallery(foundGallery)) =>
        `CompleteGallery(mergeGallery(gallery, foundGallery))
      | (`Image(image), `Image(foundImage)) =>
        `CompleteImage(mergeImage(image, foundImage))
      | _ => noMatchCompleteChild(descendant)
      }
    };
  };

let make =
    (
      ~gallery: option(GalleryQueries.gallery),
      ~moreGallery: option(GalleryQueries.moreGallery),
      ~loadNextPage: array(string) => unit,
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=cls>
      (
        switch (gallery, moreGallery) {
        | (Some(gallery), Some(moreGallery)) =>
          switch (gallery##descendants) {
          | Some(descendants) =>
            let newDescendants =
              Array.map(
                descendant =>
                  completeChild(descendant, moreGallery##descendants),
                descendants,
              );
            <Gallery
              loadNextPage
              name=gallery##name
              path=gallery##path
              slug=gallery##slug
              descendants=newDescendants
            />;
          | None => <FullPageSpinner />
          }
        | _ => <FullPageSpinner />
        }
      )
    </div>,
};
