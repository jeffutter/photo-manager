open Css;

let cls =
  style([margin2(~v=px(0), ~h=auto), padding(px(8)), display(block)]);

let outerCls = (~w, ~h) => style([width(px(w)), height(px(h))]);

[@react.component]
let make = (~name: string, ~slug: string) => {
    <div className=(outerCls(~w=320, ~h=275))>
      <GalleryItem lightBG=false>
        ...(
             (wrapClass, detailsClass) => {
               let link = "/gallery/" ++ slug;
               <NavLink _to=link className=wrapClass>
                 <svg
                   viewBox="0 0 8 8"
                   width="200px"
                   height="200px"
                   className=cls>
                   <path
                     d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
                     id="folder"
                   />
                 </svg>
                 <div className=detailsClass> (React.string(name)) </div>
               </NavLink>;
             }
           )
      </GalleryItem>
    </div>
};