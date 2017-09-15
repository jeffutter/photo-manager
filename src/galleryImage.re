let styles: Js.t 'a = [%bs.raw "require('./components/gallery/image/style.scss')"];

let component = ReasonReact.statelessComponent "GalleryImage";

let make
    name::(name: string)
    thumbnail::(thumbnail: option string)=?
    ::handleOpen
    innerRef::(innerRef: option (Js.null Dom.element => unit))=?
    _children => {
  ...component,
  render: fun _self =>
    <div onClick=handleOpen ref=?innerRef className=styles##item>
      (
        switch thumbnail {
        | Some thumb => <img src=thumb className=styles##thumbnail width="300" height="225" />
        | None => <CircleLoader />
        }
      )
      <div className=styles##item_details> (ReasonReact.stringToElement name) </div>
    </div>
};
