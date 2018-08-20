open Css;

let component = ReasonReact.statelessComponent("GalleryBody");

let imageWidth = 300;

let imageHeight = 325;

let galleryHeight = 300;

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

let cls = gridMargin =>
  style([margin2(~v=px(0), ~h=px(gridMargin)), outlineStyle(`none)]);

let marginCls = cellPadding =>
  style([
    margin4(
      ~top=px(10),
      ~right=`zero,
      ~bottom=`zero,
      ~left=px(cellPadding),
    ),
  ]);

let cellRenderer =
    (
      loadImage,
      isScrolling,
      openLightbox,
      grid,
      marginCls: string,
      options: Grid.cellRenderOptions,
    ) => {
  let columnIndex = options |. Grid.columnIndexGet;
  let rowIndex = options |. Grid.rowIndexGet;
  let key = options |. Grid.keyGet;
  let style = options |. Grid.styleGet;
  switch (List.nth(grid, rowIndex)) {
  | row =>
    switch (List.nth(row, columnIndex)) {
    | cell =>
      <div style key className=marginCls>
        (
          switch (cell) {
          | `CompleteImage(image) =>
            /* If thumbnail isn't loaded, call load more */
            switch (image##thumbnail, isScrolling) {
            | (Some(_), _) => ()
            | (None, true) => ()
            | (None, false) => loadImage(image##slug)
            };
            <GalleryImage
              key
              slug=image##slug
              handleOpen=(_event => openLightbox(image##slug))
              thumbnail=image##thumbnail
              name=image##name
              rating=image##rating
            />;
          | `CompleteGallery(gallery) =>
            <GalleryThumb key name=gallery##name slug=gallery##slug />
          }
        )
      </div>
    | exception (Failure(_)) => <div key style />
    }
  | exception (Failure(_)) => <div key style />
  };
};

let rowHeight = (grid, {index}: Grid.rowHeightOptions) =>
  switch (List.nth(grid, index)) {
  | row =>
    List.for_all(
      item =>
        switch (item) {
        | `CompleteGallery(_) => true
        | _ => false
        },
      row,
    ) ?
      galleryHeight : imageHeight
  | exception (Failure(_)) => imageHeight
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
             let parentWidth = size |. AutoSizer.widthGet;
             let columns = columns(parentWidth);
             let gutter = gutter(parentWidth);
             let cellWidth = imageWidth + gutter;
             let gridWidth = cellWidth * columns;
             let gridMargin = (parentWidth - gridWidth) / 2;
             let cellPadding = (cellWidth - imageWidth) / 2;
             let grid = listDescendants |> Utils.chunkList(columns);
             <Grid
               autoHeight=true
               cellRenderer=(
                 cellRenderer(
                   loadImage,
                   isScrolling,
                   openLightbox,
                   grid,
                   marginCls(cellPadding),
                 )
               )
               className=(cls(gridMargin))
               columnCount=columns
               columnWidth=cellWidth
               height=windowHeight
               isScrolling
               onScroll
               overscanRowCount=5
               rowCount=(List.length(grid))
               rowHeight=(rowHeight(grid))
               scrollTop
               /* rowHeight=(`Number(325)) */
               width=gridWidth
             />;
           }
         )
    </AutoSizer>;
  },
};