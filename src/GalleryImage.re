open Css;

let component = ReasonReact.statelessComponent("GalleryItem");

let imgCls = style([`declaration(("objectFit", "cover")), display(block)]);

let cls = (~w, ~h) => style([width(px(w)), height(px(h))]);

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string),
      ~rating: option(int),
      ~handleOpen,
      _children,
    ) => {
  ...component,
  render: _ =>
    <div className=(cls(~w=320, ~h=295))>
      (
        switch (thumbnail) {
        | Some(thumb) =>
          <GalleryItem lightBG=true>
            ...(
                 (wrapClass, detailsClass) =>
                   <div onClick=handleOpen className=wrapClass>
                     <img
                       src=thumb
                       className=imgCls
                       width="300"
                       height="225"
                     />
                     <div className=detailsClass>
                       <div> (ReasonReact.string(name)) </div>
                       <Stars slug rating />
                     </div>
                   </div>
               )
          </GalleryItem>
        | None =>
          <WaypointItem ?onEnter name slug ?thumbnail ?rating>
            ...(
                 () =>
                   <GalleryItem lightBG=true>
                     ...(
                          (wrapClass, detailsClass) =>
                            <div onClick=handleOpen className=wrapClass>
                              <CircleLoader />
                              <div className=detailsClass>
                                <div> (ReasonReact.string(name)) </div>
                                <Stars slug rating />
                              </div>
                            </div>
                        )
                   </GalleryItem>
               )
          </WaypointItem>
        }
      )
    </div>,
};
