open Css;

let component = ReasonReact.statelessComponent("GalleryBody");

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
      loadImage,
      openLightbox,
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
        /* If thumbnail isn't loaded, call load more */
        switch (image##thumbnail) {
        | Some(_) => ()
        | None => loadImage(image##slug)
        };
        <div style key>
          <div className=marginCls>
            <GalleryImage
              key
              slug=image##slug
              handleOpen=(_event => openLightbox(image##slug))
              thumbnail=image##thumbnail
              name=image##name
              rating=image##rating
            />
          </div>
        </div>;
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
      ~descendants: GalleryQueries.completeDescendants=[||],
      ~openLightbox: string => unit,
      ~loadImage: string => unit,
      ~windowHeight: int,
      ~isScrolling: bool,
      ~onScroll: WindowScroller.onChildScroll => unit,
      ~scrollTop: int,
      _children,
    ) => {
  ...component,
  render: (_) => {
    let listDescendants = descendants |> Array.to_list;
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
             let grid = listDescendants |> Utils.chunkList(columns);
             let marginCls =
               style([
                 position(`relative),
                 top(px(10)),
                 left(px(cellPadding)),
               ]);
             <Grid
               autoHeight=true
               cellRenderer=(
                 cellRenderer(loadImage, openLightbox, grid, marginCls)
               )
               className=(
                 style([
                   margin2(~v=px(0), ~h=px(gridMargin)),
                   outlineStyle(`none),
                 ])
               )
               columnCount=columns
               columnWidth=cellWidth
               height=windowHeight
               isScrolling
               onScroll
               overscanRowCount=5
               rowCount=(List.length(grid))
               rowHeight=325
               scrollTop
               width=gridWidth
             />;
           }
         )
    </AutoSizer>;
  },
};