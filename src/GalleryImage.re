open Css;

let component = ReasonReact.statelessComponent("GalleryItem");

let imgCls = style([`declaration(("objectFit", "cover")), display(block)]);

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
  render: (_) =>
    <WaypointItem w=320 h=295 ?onEnter name slug ?thumbnail ?rating>
      ...(
           (~visible as _visible) =>
             true ?
               <GalleryItem lightBG=true>
                 ...(
                      (wrapClass, detailsClass) =>
                        <div onClick=handleOpen className=wrapClass>
                          (
                            switch (thumbnail) {
                            | Some(thumb) =>
                              <img
                                src=thumb
                                className=imgCls
                                width="300"
                                height="225"
                              />
                            | None => <CircleLoader />
                            }
                          )
                          <div className=detailsClass>
                            <div> (ReasonReact.string(name)) </div>
                            <Stars slug rating />
                          </div>
                        </div>
                    )
               </GalleryItem> :
               <div />
         )
    </WaypointItem>,
};