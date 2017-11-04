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
  "height": string
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
  | AddImage(Js.Array.t(image), string)
  | LoadImages;

let component = ReasonReact.reducerComponent("Gallery");

let make =
    (
      ~name="",
      ~path=[||],
      ~slug="",
      ~descendants=[||],
      ~loadNextPage: Js.Array.t(string) => unit,
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
    | AddImage(images, slug) =>
      let thumbedImages =
        Js.Array.filter(
          (item) =>
            switch (Js.Nullable.to_opt(item##thumbnail)) {
            | Some(_) => true
            | None => false
            },
          images
        );
      let thumbedImageSlugs = Js.Array.map((item) => item##slug, thumbedImages);
      switch (Js.Array.includes(slug, thumbedImageSlugs)) {
      | false =>
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
      | _ => ReasonReact.NoUpdate
      }
    | LoadImages =>
      let chunks = Utils.chunkList(20, state.pendingImages);
      let newState = {...state, pendingImages: [], loadingTimeout: ref(None)};
      ReasonReact.UpdateWithSideEffects(
        newState,
        ((_self) => List.iter((chunk) => loadNextPage(Array.of_list(chunk)), chunks))
      )
    },
  render: (self) => {
    let images =
      Utils.sortBy(
        (item) => item##name,
        Js.Array.filter((item) => item##__typename == "Image", descendants)
      );
    let galleries =
      Utils.sortBy(
        (item) => item##name,
        Js.Array.filter((item) => item##__typename == "Gallery", descendants)
      );
    let renderedGalleries =
      Js.Array.map(
        (item) => <WaypointGalleryThumb key=item##id name=item##name slug=item##slug />,
        galleries
      );
    let renderedImages =
      Js.Array.mapi(
        (item, index) =>
          <WaypointImage
            key=item##id
            onEnter=(self.reduce((_event) => AddImage(images, item##id)))
            handleOpen=(self.reduce((_event) => OpenLightbox(index)))
            thumbnail=(Js.Nullable.to_opt(item##thumbnail))
            name=item##name
          />,
        images
      );
    let renderedDescendants = Js.Array.concat(renderedGalleries, renderedImages);
    let swipeImages =
      Js.Array.map(
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
    ReasonReact.createDomElement(
      "div",
      ~props={"className": "gallery"},
      [|
        ReasonReact.element(BreadCrumbs.make(~slug, ~path, ~name, [||])),
        ReasonReact.element(GalleryBody.make(renderedDescendants)),
        ReasonReact.element(
          PhotoSwipe.make(
            ~isOpen=self.state.lightboxIsOpen,
            ~items=swipeImages,
            ~onClose=self.reduce((_event) => CloseLightbox),
            ~options=swipeOptions,
            [||]
          )
        )
      |]
    )
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~name=jsProps##name,
        ~path=jsProps##path,
        ~slug=jsProps##slug,
        ~descendants=jsProps##descendants,
        ~loadNextPage=jsProps##loadNextPage,
        [||]
      )
  );
