open Glamor;

type descendants = {. "name": string, "id": string};

type gallery = {
  .
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "descendants": Js.Array.t(descendants)
};

let component = ReasonReact.statelessComponent("GalleryContainer");

let cls =
  css([
    padding("56px 8px 8px 8px"),
    position("absolute"),
    width("100%"),
    height("100%"),
    boxSizing("border-box")
  ]);

let make =
    (
      ~loading: bool=false,
      ~gallery: gallery,
      ~moreLoading: bool=false,
      ~moreGallery: gallery,
      ~loadNextPage: Js.Array.t(string) => unit,
      _children
    ) => {
  ...component,
  render: (_self) =>
    switch (loading, moreLoading) {
    | (false, false) =>
      let newDescendants =
        Js.Array.map(
          (descendant) => {
            let foundIndex =
              Js.Array.findIndex(
                (moreDescendant) => moreDescendant##id == descendant##id,
                moreGallery##descendants
              );
            switch foundIndex {
            | index when index >= 0 =>
              let descendants = moreGallery##descendants;
              let foundDescendant = descendants[index];
              let empty = Js.Obj.empty();
              let old = Js.Obj.assign(empty, descendant);
              Js.Obj.assign(old, foundDescendant)
            | _ => descendant
            }
          },
          gallery##descendants
        );
      let empty = Js.Obj.empty();
      let old = Js.Obj.assign(empty, gallery);
      let newGallery = Js.Obj.assign(old, {"descendants": newDescendants});
      <div className=cls>
        <Gallery
          loadNextPage
          name=newGallery##name
          path=newGallery##path
          slug=newGallery##slug
          descendants=newGallery##descendants
        />
      </div>
    | _ => <div className=cls> <FullPageSpinner /> </div>
    }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~loading=Js.to_bool(jsProps##queryData##loading),
        ~gallery=jsProps##queryData##gallery,
        ~moreLoading=Js.to_bool(jsProps##moreLoading),
        ~moreGallery=jsProps##moreGallery,
        ~loadNextPage=jsProps##loadNextPage,
        [||]
      )
  );
