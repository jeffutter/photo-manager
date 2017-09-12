let styles: Js.t 'a = [%bs.raw "require('./components/gallery/image/style.scss')"];

let component = ReasonReact.statelessComponent "GalleryImage";

let make ::name ::thumbnail=? ::handleOpen ::innerRef _children => {
  ...component,
  render: fun _self =>
    <div onClick=handleOpen ref=innerRef>
      (
        switch thumbnail {
        | None => <CircleLoader />
        | Some thumb => <img src=thumb className=styles##thumbnail width="300" height="225" />
        }
      )
      <div className=styles##item__details> name </div>
    </div>
};

let default =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          name::jsProps##name
          thumbnail::jsProps##thumbnail
          handleOpen::jsProps##handleOpen
          innerRef::jsProps##innerRef
          [||]
    );
