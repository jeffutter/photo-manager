type state = {
  lightboxIsOpen: bool,
  currentImage: int,
  pendingImages: list(string),
  loadingTimeout: ref(option(Js.Global.timeoutId)),
  descendants: GalleryQueries.completeDescendants,
};

type action =
  | OpenLightbox(int)
  | CloseLightbox
  | AddImage(string)
  | LoadImages;

let component = ReasonReact.reducerComponent("Gallery");

let rec splitDescendants =
        (
          (
            thumbedImageSlugs: list(string),
            images: list(GalleryQueries.completeImage),
            galleries: list(GalleryQueries.galleryNoDescendants),
          ),
          descendants,
        ) =>
  switch (descendants) {
  | [] => (
      List.rev(thumbedImageSlugs),
      List.rev(images),
      List.rev(galleries),
    )
  | [descendant, ...rest] =>
    switch (descendant) {
    | `CompleteImage(image) =>
      switch (image##thumbnail) {
      | Some(_) =>
        splitDescendants(
          (
            [image##slug, ...thumbedImageSlugs],
            [image, ...images],
            galleries,
          ),
          rest,
        )
      | None =>
        splitDescendants(
          (thumbedImageSlugs, [image, ...images], galleries),
          rest,
        )
      }
    | `CompleteGallery(gallery) =>
      splitDescendants(
        (thumbedImageSlugs, images, [gallery, ...galleries]),
        rest,
      )
    }
  };

let addFunc = (thumbedImageSlugs, slug, send) => {
  let slugHasThumb =
    List.exists(imageSlug => slug == imageSlug, thumbedImageSlugs);

  switch (slugHasThumb) {
  | false => send(AddImage(slug))
  | _ => ()
  };
};

let make =
    (
      ~name="",
      ~path=[||],
      ~slug="",
      ~descendants: GalleryQueries.completeDescendants=[||],
      ~loadNextPage: array(string) => unit,
      _children,
    ) => {
  ...component,
  initialState: () => {
    lightboxIsOpen: false,
    currentImage: 0,
    pendingImages: [],
    loadingTimeout: ref(None),
    descendants,
  },
  reducer: (action, state) =>
    switch (action) {
    | OpenLightbox(index) =>
      ReasonReact.Update({
        ...state,
        lightboxIsOpen: true,
        currentImage: index,
      })
    | CloseLightbox =>
      ReasonReact.Update({...state, lightboxIsOpen: false, currentImage: 0})
    | AddImage(slug) =>
      let new_state = {
        ...state,
        pendingImages: [slug, ...state.pendingImages],
      };
      ReasonReact.UpdateWithSideEffects(
        new_state,
        (
          self =>
            switch (state.loadingTimeout^) {
            | Some(_) => ()
            | None =>
              state.loadingTimeout :=
                Some(Js.Global.setTimeout(_ => self.send(LoadImages), 200));
              ();
            }
        ),
      );
    | LoadImages =>
      let chunks = Utils.chunkList(20, state.pendingImages);
      let newState = {
        ...state,
        pendingImages: [],
        loadingTimeout: ref(None),
      };
      ReasonReact.UpdateWithSideEffects(
        newState,
        (
          _self =>
            List.iter(
              chunk => {
                let someChunk = chunk |> Array.of_list;
                loadNextPage(someChunk);
              },
              chunks,
            )
        ),
      );
    },
  shouldUpdate:
    ({oldSelf: {state: oldState}, newSelf: {state: newState}}) =>
    oldState.descendants != newState.descendants
    || oldState.lightboxIsOpen != newState.lightboxIsOpen
    || oldState.currentImage != newState.currentImage,
  willReceiveProps: ({state}) => {...state, descendants},
  render: self => {
    Console.time("gallery");
    Console.time("gallery-split");
    let (thumbedImageSlugs, images, galleries) =
      self.state.descendants
      |> Array.to_list
      |> splitDescendants(([], [], []));
    Console.timeEnd("gallery-split");
    Console.time("gallery-render-galleries");
    let renderedGalleries =
      List.map(
        item => <GalleryThumb key=item##id name=item##name slug=item##slug />,
        galleries,
      );
    Console.timeEnd("gallery-render-galleries");
    Console.time("gallery-render-images");
    let renderedImages =
      List.mapi(
        (index, image: GalleryQueries.completeImage) => {
          let slug = image##slug;
          <GalleryImage
            key=image##id
            slug
            onEnter=(() => addFunc(thumbedImageSlugs, slug, self.send))
            handleOpen=(_event => self.send(OpenLightbox(index)))
            thumbnail=image##thumbnail
            name=image##name
            rating=image##rating
          />;
        },
        images,
      );
    Console.timeEnd("gallery-render-images");
    Console.time("gallery-render-concat");
    let renderedDescendants =
      List.concat([renderedGalleries, renderedImages]);
    Console.timeEnd("gallery-render-concat");
    Console.time("gallery-swipe");
    let swipeImages =
      List.map(
        (image: GalleryQueries.completeImage) => {
          "src": image##largeUrl,
          "msrc": image##smallUrl,
          "w": image##width,
          "h": image##height,
          "title": image##name,
        },
        images,
      );
    Console.timeEnd("gallery-swipe");
    Console.timeEnd("gallery");
    let swipeOptions = {"index": self.state.currentImage};
    <div className="gallery">
      <BreadCrumbs slug path name />
      <GalleryBody> ...(Array.of_list(renderedDescendants)) </GalleryBody>
      <PhotoSwipe
        isOpen=self.state.lightboxIsOpen
        items=(Array.of_list(swipeImages))
        onClose=(_event => self.send(CloseLightbox))
        options=swipeOptions
      />
    </div>;
  },
};
