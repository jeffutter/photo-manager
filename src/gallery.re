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
  currentImage: int
};

type action =
  | OpenLightbox(int)
  | CloseLightbox;

let component = ReasonReact.reducerComponent("Gallery");

let fetchBuffer = ref([||]);

let loadRequestedImages = (loadNextPage: Js.Array.t(string) => unit) : unit => {
  let currentBuffer = fetchBuffer^;
  fetchBuffer := [||];
  switch (Js.Array.length(currentBuffer)) {
  | c when c <= 0 => ()
  | _ =>
    let chunks = Utils.chunk(20, currentBuffer);
    Js.Array.forEach((chunk) => loadNextPage(chunk), chunks);
    ()
  }
};

let debouncedLoadRequestedImages =
  Utils.debounce(
    ~waitMs=500,
    ~trailing=true,
    Utils.debounce(~waitMs=1000, ~leading=true, ~trailing=true, loadRequestedImages)
  );

let fancyLoadNextPage =
    (loadNextPage: Js.Array.t(string) => unit, descendants: Js.Array.t('a))
    : ('a => unit) => {
  let images = Js.Array.filter((item) => item##__typename == "Image", descendants);
  let thumbedImages =
    Js.Array.filter(
      (item) =>
        switch (Js.Nullable.to_opt(item##thumbnail)) {
        | Some(_) => true
        | None => false
        },
      images
    );
  let thumbedImageIds = Js.Array.map((item) => item##id, thumbedImages);
  (item) =>
    switch (
      item##__typename,
      Js.Nullable.to_opt(item##thumbnail),
      Js.Array.includes(item##id, thumbedImageIds)
    ) {
    | ("Image", None, false) =>
      ignore(Js.Array.push(item##id, fetchBuffer^));
      debouncedLoadRequestedImages(loadNextPage)
    | _ => ()
    }
};

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
  initialState: () => {lightboxIsOpen: false, currentImage: 0},
  reducer: (action, _state) =>
    switch action {
    | OpenLightbox(index) => ReasonReact.Update({lightboxIsOpen: true, currentImage: index})
    | CloseLightbox => ReasonReact.Update({lightboxIsOpen: false, currentImage: 0})
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
    let bBufferedLoadNextPage = fancyLoadNextPage(loadNextPage, descendants);
    let bufferedLoadNextPage = (item, _event, _self) => bBufferedLoadNextPage(item);
    let renderedGalleries =
      Js.Array.map(
        (item) =>
          <WaypointGalleryThumb
            key=item##id
            onEnter=(self.handle(bufferedLoadNextPage(item)))
            name=item##name
            slug=item##slug
          />,
        galleries
      );
    let renderedImages =
      Js.Array.mapi(
        (item, index) =>
          <WaypointImage
            key=item##id
            onEnter=(self.handle(bufferedLoadNextPage(item)))
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
