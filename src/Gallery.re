open Css;

type state = {
  lightboxIsOpen: bool,
  currentImage: int,
};

type action =
  | OpenLightbox(int)
  | CloseLightbox;

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

let openLightboxFunc = (send, thumbedImageSlugs, slug) => {
  let index = thumbedImageSlugs |> Array.of_list |> Js.Array.indexOf(slug);
  send(OpenLightbox(index));
};

let pending: ref(list(string)) = ref([]);

let loadPending =
  Debouncer.make(~wait=200, (loadNextPage: array(string) => unit) =>
    switch (pending^) {
    | [] => ()
    | list =>
      pending := [];
      let chunks = Utils.chunkList(20, list);
      List.iter(chunk => loadNextPage(Array.of_list(chunk)), chunks);
      ();
    }
  );

let addToPending = (loadNextPage: array(string) => unit, slug: string) => {
  pending := [slug, ...pending^];
  loadPending(loadNextPage);
};

[@react.component]
let make =
    (
      ~name="",
      ~path=[||],
      ~slug="",
      ~descendants: GalleryQueries.completeDescendants=[||],
      ~loadNextPage: array(string) => unit,
    ) => {
  let (state, dispatch) =
    React.useReducer(
      (_state, action) =>
        switch (action) {
        | OpenLightbox(index) => {lightboxIsOpen: true, currentImage: index}
        | CloseLightbox => {lightboxIsOpen: false, currentImage: 0}
        },
      {lightboxIsOpen: false, currentImage: 0},
    );

  let (thumbedImageSlugs, images) =
    descendants |> Array.to_list |> splitDescendants(([], []));
  let openLightbox = openLightboxFunc(dispatch, thumbedImageSlugs);
  let loadImage = slug => {
    let slugHasThumb =
      List.exists(imageSlug => slug == imageSlug, thumbedImageSlugs);
    switch (slugHasThumb) {
    | false =>
      addToPending(loadNextPage, slug);
      ();
    | _ => ()
    };
  };
  let swipeImages =
    images
    |> List.map((image: GalleryQueries.completeImage) =>
         {
           "src": image##largeUrl,
           "msrc": image##smallUrl,
           "w": image##width,
           "h": image##height,
           "title": image##name,
         }
       )
    |> Array.of_list;
  let swipeOptions = {"index": state.currentImage};
  let showPhotoSwipe = Array.length(swipeImages) > 0;
  <WindowScroller>
    ...{scrollerOptions =>
      <div className={style([position(`relative), height(pct(100.0))])}>
        <BreadCrumbs slug path name />
        <GalleryBody
          windowHeight={WindowScroller.heightGet(scrollerOptions)}
          openLightbox
          isScrolling={WindowScroller.isScrollingGet(scrollerOptions)}
          onScroll={WindowScroller.onChildScrollGet(scrollerOptions)}
          scrollTop={WindowScroller.scrollTopGet(scrollerOptions)}
          descendants
          loadImage
        />
        {showPhotoSwipe
           ? <PhotoSwipe
               isOpen={state.lightboxIsOpen}
               items=swipeImages
               onClose={_event => dispatch(CloseLightbox)}
               options=swipeOptions
             />
           : <div />}
      </div>
    }
  </WindowScroller>;
};