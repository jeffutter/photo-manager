let styles: Js.t 'a = [%bs.raw "require('./components/gallery/gallery_thumb/style.scss')"];

let component = ReasonReact.statelessComponent "GalleryThumb";

let make ::name ::slug ::innerRef _children => {
  ...component,
  render: fun _self => {
    let link = "/gallery/" ^ slug;
    <NavLink _to=link className=styles##item innerRef>
      <svg viewBox="0 0 8 8" width="200px" height="200px" className=styles##icon>
        <path
          d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
          id="folder"
        />
      </svg>
      <div className=styles##item_details> name </div>
    </NavLink>
  }
};

let default =
  ReasonReact.wrapReasonForJs
    ::component
    (fun jsProps => make name::jsProps##name slug::jsProps##slug innerRef::jsProps##innerRef [||]);
