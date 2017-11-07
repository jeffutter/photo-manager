type image = {
  .
  "__typename": string,
  "id": string,
  "name": string,
  "slug": string,
  "thumbnail": Js.Nullable.t(string),
  "large_url": string,
  "small_url": string,
  "width": string,
  "height": string,
  "rating": Js.Nullable.t(int)
};

type state = {
  lightboxIsOpen: bool,
  currentImage: int,
  pendingImages: list(string),
  loadingTimeout: ref(option(Js.Global.timeoutId))
};

type action =
  | OpenLightbox(int)
  | CloseLightbox
  | AddImage(string)
  | LoadImages;

let component = ReasonReact.reducerComponent("Gallery");

let rec splitDescendants =
        (descendants, (thumbedImages: list(image), images: list(image), galleries: list('a))) =>
  switch descendants {
  | [] => (List.rev(thumbedImages), List.rev(images), List.rev(galleries))
  | [descendant, ...rest] =>
    switch descendant##__typename {
    | "Image" =>
      switch (Js.Nullable.to_opt(descendant##thumbnail)) {
      | Some(_) =>
        splitDescendants(
          rest,
          ([descendant, ...thumbedImages], [descendant, ...images], galleries)
        )
      | None => splitDescendants(rest, (thumbedImages, [descendant, ...images], galleries))
      }
    | "Gallery" => splitDescendants(rest, (thumbedImages, images, [descendant, ...galleries]))
    | type_ =>
      Js.log("Unknown Type: " ++ type_);
      (thumbedImages, images, galleries)
    }
  };

let make =
    (
      ~name="",
      ~path=[||],
      ~slug="",
      ~descendants=[||],
      ~loadNextPage: Js.Array.t(string) => unit,
      ~submitRating,
      _children
    ) => {
  ...component,
  initialState: () => {
    lightboxIsOpen: false,
    currentImage: 0,
    pendingImages: [],
    loadingTimeout: ref(None)
  },
  reducer: (action, state) =>
    switch action {
    | OpenLightbox(index) =>
      ReasonReact.Update({...state, lightboxIsOpen: true, currentImage: index})
    | CloseLightbox => ReasonReact.Update({...state, lightboxIsOpen: false, currentImage: 0})
    | AddImage(slug) =>
      let new_state = {...state, pendingImages: [slug, ...state.pendingImages]};
      ReasonReact.UpdateWithSideEffects(
        new_state,
        (
          (self) =>
            switch state.loadingTimeout^ {
            | Some(_) => ()
            | None =>
              state.loadingTimeout :=
                Some(Js.Global.setTimeout(self.reduce((_) => LoadImages), 200));
              ()
            }
        )
      )
    | LoadImages =>
      let chunks = Utils.chunkList(20, state.pendingImages);
      let newState = {...state, pendingImages: [], loadingTimeout: ref(None)};
      ReasonReact.UpdateWithSideEffects(
        newState,
        ((_self) => List.iter((chunk) => loadNextPage(Array.of_list(chunk)), chunks))
      )
    },
  render: (self) => {
    let (thumbedImages, images, galleries) =
      splitDescendants(Array.to_list(descendants), ([], [], []));
    let renderedGalleries =
      List.map(
        (item) => <WaypointGalleryThumb key=item##id name=item##name slug=item##slug />,
        galleries
      );
    let thumbedImageSlugs = List.map((image) => image##slug, thumbedImages);
    let renderedImages =
      List.mapi(
        (index, image) =>
          <WaypointImage
            key=image##id
            slug=image##slug
            onEnter=(
              () =>
                switch (List.exists((imageSlug) => image##slug == imageSlug, thumbedImageSlugs)) {
                | false => self.reduce((_event) => AddImage(image##slug), ())
                | _ => ()
                }
            )
            handleOpen=(self.reduce((_event) => OpenLightbox(index)))
            thumbnail=(Js.Nullable.to_opt(image##thumbnail))
            name=image##name
            rating=(Js.Nullable.to_opt(image##rating))
            submitRating
          />,
        images
      );
    let renderedDescendants = List.concat([renderedGalleries, renderedImages]);
    let swipeImages =
      List.map(
        (image: image) => {
          "src": image##large_url,
          "msrc": image##small_url,
          "w": image##width,
          "h": image##height,
          "title": image##name
        },
        images
      );
    let swipeOptions = {"index": self.state.currentImage};
    <div className="gallery">
      <BreadCrumbs slug path name />
      (ReasonReact.element(GalleryBody.make(Array.of_list(renderedDescendants))))
      <PhotoSwipe
        isOpen=self.state.lightboxIsOpen
        items=(Array.of_list(swipeImages))
        onClose=(self.reduce((_event) => CloseLightbox))
        options=swipeOptions
      />
    </div>
  }
};
