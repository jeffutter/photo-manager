open Css;

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
          ),
          descendants,
        ) =>
  switch (descendants) {
  | [] => (List.rev(thumbedImageSlugs), List.rev(images))
  | [descendant, ...rest] =>
    switch (descendant) {
    | `CompleteImage(image) =>
      switch (image##thumbnail) {
      | Some(_) =>
        splitDescendants(
          ([image##slug, ...thumbedImageSlugs], [image, ...images]),
          rest,
        )
      | None =>
        splitDescendants((thumbedImageSlugs, [image, ...images]), rest)
      }
    | `CompleteGallery(_gallery) =>
      splitDescendants((thumbedImageSlugs, images), rest)
    }
  };

let addFunc = (send, thumbedImageSlugs, slug) => {
  let slugHasThumb =
    List.exists(imageSlug => slug == imageSlug, thumbedImageSlugs);
  switch (slugHasThumb) {
  | false => send(AddImage(slug))
  | _ => ()
  };
};

let openLightboxFunc = (send, thumbedImageSlugs, slug) => {
  let index = thumbedImageSlugs |> Array.of_list |> Js.Array.indexOf(slug);
  send(OpenLightbox(index));
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
                Some(Js.Global.setTimeout(() => self.send(LoadImages), 200));
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
    let (thumbedImageSlugs, images) =
      self.state.descendants |> Array.to_list |> splitDescendants(([], []));
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
    let swipeOptions = {"index": self.state.currentImage};
    <WindowScroller>
      ...(
           windowScrollerOptions => {
             let windowHeight = windowScrollerOptions |. WindowScroller.height;
             let isScrolling =
               windowScrollerOptions |. WindowScroller.isScrolling;
             let onScroll =
               windowScrollerOptions |. WindowScroller.onChildScroll;
             let scrollTop = windowScrollerOptions |. WindowScroller.scrollTop;
             let openLightbox =
               openLightboxFunc(self.send, thumbedImageSlugs);
             let loadImage = addFunc(self.send, thumbedImageSlugs);
             <div
               className=(style([position(`relative), height(pct(100.0))]))>
               <BreadCrumbs slug path name />
               <GalleryBody
                 windowHeight
                 openLightbox
                 isScrolling
                 onScroll
                 scrollTop
                 descendants=self.state.descendants
                 loadImage
               />
               <PhotoSwipe
                 isOpen=self.state.lightboxIsOpen
                 items=(Array.of_list(swipeImages))
                 onClose=(_event => self.send(CloseLightbox))
                 options=swipeOptions
               />
             </div>;
           }
         )
    </WindowScroller>;
  },
};