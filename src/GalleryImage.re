open Css;

let imgCls = style([unsafe("objectFit", "cover"), display(block)]);

let cls = (~w, ~h) => style([width(px(w)), height(px(h))]);

[@react.component]
let make =
    (
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string),
      ~rating: option(int),
      ~handleOpen,
    ) => {
    <div className=(cls(~w=300, ~h=295))>
      <GalleryItem lightBG=true>
        ...(
             (wrapClass, detailsClass) =>
               switch (thumbnail) {
               | Some(thumb) =>
                 <div onClick=handleOpen className=wrapClass>
                   <img src=thumb className=imgCls width="300" height="225" />
                   <div className=detailsClass>
                     <div> (React.string(name)) </div>
                     <Stars slug rating />
                   </div>
                 </div>
               | None =>
                 <div onClick=handleOpen className=wrapClass>
                   <CircleLoader />
                   <div className=detailsClass>
                     <div> (React.string(name)) </div>
                     <Stars slug rating />
                   </div>
                 </div>
               }
           )
      </GalleryItem>
    </div>
};