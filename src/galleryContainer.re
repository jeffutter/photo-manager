open Css;

[@bs.val]
external assign3 : (Js.t({..}), Js.t({..}), Js.t({..})) => Js.t({..}) =
  "Object.assign";

type descendants = {
  .
  "name": string,
  "id": string,
};

type gallery = {
  .
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "descendants": Js.Array.t(descendants),
};

let component = ReasonReact.statelessComponent("GalleryContainer");

let cls =
  style([
    padding4(~top=px(56), ~right=px(8), ~bottom=px(8), ~left=px(8)),
    position(absolute),
    width(`percent(100.0)),
    height(`percent(100.0)),
    boxSizing(borderBox),
  ]);

let make =
    (
      ~loading: bool=false,
      ~gallery: gallery,
      ~moreLoading: bool=false,
      ~moreGallery: gallery,
      ~loadNextPage: Js.Array.t(string) => unit,
      ~submitRating,
      _children,
    ) => {
  ...component,
  render: _self =>
    switch (loading, moreLoading) {
    | (false, false) =>
      let newDescendants =
        Js.Array.map(
          descendant => {
            let foundIndex =
              Js.Array.findIndex(
                moreDescendant => moreDescendant##id == descendant##id,
                moreGallery##descendants,
              );
            switch (foundIndex) {
            | index when index >= 0 =>
              let descendants = moreGallery##descendants;
              let foundDescendant = descendants[index];
              assign3(Js.Obj.empty(), descendant, foundDescendant);
            | _ => descendant
            };
          },
          gallery##descendants,
        );
      let newGallery =
        assign3(Js.Obj.empty(), gallery, {"descendants": newDescendants});
      <div className=cls>
        <Gallery
          loadNextPage
          submitRating
          name=newGallery##name
          path=newGallery##path
          slug=newGallery##slug
          descendants=newGallery##descendants
        />
      </div>;
    | _ => <div className=cls> <FullPageSpinner /> </div>
    },
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~loading=Js.to_bool(jsProps##queryData##loading),
      ~gallery=jsProps##queryData##gallery,
      ~moreLoading=Js.to_bool(jsProps##moreLoading),
      ~moreGallery=jsProps##moreGallery,
      ~submitRating=jsProps##submitRating,
      ~loadNextPage=jsProps##loadNextPage,
      [||],
    )
  );