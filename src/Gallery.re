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

let addFunc = (thumbedImageSlugs, slug, send) => {
  let slugHasThumb =
    List.exists(imageSlug => slug == imageSlug, thumbedImageSlugs);
  switch (slugHasThumb) {
  | false => send(AddImage(slug))
  | _ => ()
  };
};

let imageWidth = 300;

let baseGutter = 50;

let columns = (width: int) : int =>
  switch (width) {
  | w when w > 5 * (imageWidth + baseGutter * 2) => 5
  | w when w > 5 * (imageWidth + baseGutter) => 5
  | w when w > 4 * (imageWidth + baseGutter) => 4
  | w when w > 3 * (imageWidth + baseGutter) => 3
  | w when w > 2 * (imageWidth + baseGutter) => 2
  | _ => 1
  };

let gutter = (width: int) : int =>
  switch (width) {
  | w when w > 5 * (imageWidth + baseGutter * 2) => baseGutter * 2
  | w when w > 5 * (imageWidth + baseGutter) => baseGutter
  | w when w > 4 * (imageWidth + baseGutter) => baseGutter
  | w when w > 3 * (imageWidth + baseGutter) => baseGutter
  | w when w > 2 * (imageWidth + baseGutter) => baseGutter
  | _ => baseGutter
  };

let cellRenderer =
    (
      send,
      thumbedImageSlugs,
      grid,
      marginCls: string,
      options: Grid.cellRenderOptions,
    ) => {
  let columnIndex = options |. Grid.columnIndex;
  let rowIndex = options |. Grid.rowIndex;
  let key = options |. Grid.key;
  let style = options |. Grid.style;
  switch (List.nth(grid, rowIndex)) {
  | row =>
    switch (List.nth(row, columnIndex)) {
    | cell =>
      switch (cell) {
      | `CompleteImage(image) =>
        <div style key>
          <div className=marginCls>
            <GalleryImage
              key
              slug=image##slug
              onEnter=(() => addFunc(thumbedImageSlugs, image##slug, send))
              handleOpen=(
                _event => {
                  Console.time("find-index");
                  let index =
                    thumbedImageSlugs
                    |> Array.of_list
                    |> Js.Array.indexOf(image##slug);
                  Console.timeEnd("find-index");
                  send(OpenLightbox(index));
                }
              )
              thumbnail=image##thumbnail
              name=image##name
              rating=image##rating
            />
          </div>
        </div>
      | `CompleteGallery(gallery) =>
        <div style key>
          <div className=marginCls>
            <GalleryThumb key name=gallery##name slug=gallery##slug />
          </div>
        </div>
      }
    | exception (Failure(_)) => <div key style />
    }
  | exception (Failure(_)) => <div key style />
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
    Console.time("gallery");
    Console.time("gallery-split");
    let (thumbedImageSlugs, images) =
      self.state.descendants |> Array.to_list |> splitDescendants(([], []));
    Console.timeEnd("gallery-split");
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
    <WindowScroller>
      ...(
           windowScrollerOptions => {
             let windowHeight = windowScrollerOptions |. WindowScroller.height;
             let isScrolling =
               windowScrollerOptions |. WindowScroller.isScrolling;
             let onChildScroll =
               windowScrollerOptions |. WindowScroller.onChildScroll;
             let scrollTop = windowScrollerOptions |. WindowScroller.scrollTop;
             <div
               className=(style([position(`relative), height(pct(100.0))]))>
               <BreadCrumbs slug path name />
               <AutoSizer disableHeight=true>
                 ...(
                      size => {
                        let parentWidth = size |. AutoSizer.width;
                        let columns = columns(parentWidth);
                        let gutter = gutter(parentWidth);
                        let cellWidth = imageWidth + gutter;
                        let gridWidth = cellWidth * columns;
                        let gridMargin = (parentWidth - gridWidth) / 2;
                        let cellPadding = (cellWidth - imageWidth) / 2;
                        let grid =
                          self.state.descendants
                          |> Array.to_list
                          |> Utils.chunkList(columns)
                          |> List.map(list => List.rev(list))
                          |> List.rev;
                        let marginCls =
                          style([
                            position(`relative),
                            top(px(10)),
                            left(px(cellPadding)),
                          ]);
                        <Grid
                          autoHeight=true
                          className=(
                            style([
                              margin2(~v=px(0), ~h=px(gridMargin)),
                              outlineStyle(`none),
                            ])
                          )
                          cellRenderer=(
                            cellRenderer(
                              self.send,
                              thumbedImageSlugs,
                              grid,
                              marginCls,
                            )
                          )
                          columnCount=columns
                          columnWidth=cellWidth
                          height=windowHeight
                          isScrolling
                          onScroll=onChildScroll
                          scrollTop
                          rowCount=(List.length(grid))
                          rowHeight=325
                          width=gridWidth
                        />;
                      }
                    )
               </AutoSizer>
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