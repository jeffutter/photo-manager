/* external sortBy : Js.Array.t 'a => ('b => bool) => Js.Array.t 'a = "sortBy" [@@bs.module "lodash"]; */
/* external chunk : Js.Array.t 'a => int => Js.Array.t (Js.Array.t 'a) =
   "chunk" [@@bs.module "lodash"]; */
type image =
  Js.t {
    .
    __typename : string,
    id : string,
    name : string,
    slug : string,
    thumbnail : Js.Nullable.t string,
    large_url : string,
    small_url : string,
    width : string,
    height : string
  };

type state = {
  lightboxIsOpen: bool,
  currentImage: int
};

type action =
  | OpenLightbox int
  | CloseLightbox;

let component = ReasonReact.reducerComponent "Gallery";

let fetchBuffer = [||];

let loadRequestedImages (loadNextPage: Js.Array.t string => unit) :unit => {
  let currentBuffer = Js.Array.copy fetchBuffer;
  ignore (Js.Array.slice start::0 end_::(Js.Array.length fetchBuffer) fetchBuffer);
  switch (Js.Array.length currentBuffer) {
  | c when c <= 0 => ()
  | _ =>
    let chunks = Utils.chunk 20 currentBuffer;
    Js.Array.forEach (fun chunk => loadNextPage chunk) chunks;
    ()
  }
};

/* let debouncedLoadRequestedImages =
   debounce
     (debounce loadRequestedImages 1000 {"leading": true, "trailing": true}) 500 {"trailing": true}; */
let debouncedLoadRequestedImages =
  Utils.debounce
    waitMs::500
    trailing::true
    (Utils.debounce waitMs::1000 leading::true trailing::true loadRequestedImages);

let fancyLoadNextPage
    (loadNextPage: Js.Array.t string => unit)
    (descendants: Js.Array.t 'a)
    :('a => unit) => {
  let images = Js.Array.filter (fun item => item##__typename == "Image") descendants;
  let thumbedImages =
    Js.Array.filter
      (
        fun item =>
          switch (Js.Nullable.to_opt item##thumbnail) {
          | Some _ => true
          | None => false
          }
      )
      images;
  let thumbedImageIds = Js.Array.map (fun item => item##id) thumbedImages;
  fun item =>
    switch (
      item##__typename,
      Js.Nullable.to_opt item##thumbnail,
      Js.Array.includes item##id thumbedImageIds
    ) {
    | ("Image", None, false) =>
      ignore (Js.Array.push item##id fetchBuffer);
      debouncedLoadRequestedImages loadNextPage
    | _ => ()
    }
};

let make
    ::name=""
    ::path=[||]
    ::slug=""
    ::descendants=[||]
    loadNextPage::(loadNextPage: Js.Array.t string => unit)
    _children => {
  ...component,
  initialState: fun () => {lightboxIsOpen: false, currentImage: 0},
  reducer: fun action _state =>
    switch action {
    | OpenLightbox index => ReasonReact.Update {lightboxIsOpen: true, currentImage: index}
    | CloseLightbox => ReasonReact.Update {lightboxIsOpen: false, currentImage: 0}
    },
  render: fun self => {
    let images =
      Utils.sortBy
        (fun item => item##name)
        (Js.Array.filter (fun item => item##__typename == "Image") descendants);
    let galleries =
      Utils.sortBy
        (fun item => item##name)
        (Js.Array.filter (fun item => item##__typename == "Gallery") descendants);
    let bBufferedLoadNextPage = fancyLoadNextPage loadNextPage descendants;
    let bufferedLoadNextPage item _event _self => bBufferedLoadNextPage item;
    let renderedGalleries =
      Js.Array.map
        (
          fun item =>
            <WaypointGalleryThumb
              key=item##id
              onEnter=(self.handle (bufferedLoadNextPage item))
              name=item##name
              slug=item##slug
            />
        )
        galleries;
    let renderedImages =
      Js.Array.mapi
        (
          fun item index =>
            <WaypointImage
              key=item##id
              onEnter=(self.handle (bufferedLoadNextPage item))
              handleOpen=(self.reduce (fun _event => OpenLightbox index))
              thumbnail=(Js.Nullable.to_opt item##thumbnail)
              name=item##name
            />
        )
        images;
    let renderedDescendants = Js.Array.concat renderedGalleries renderedImages;
    let swipeImages =
      Js.Array.map
        (
          fun (image: image) => {
            "src": image##large_url,
            "msrc": image##small_url,
            "w": image##width,
            "h": image##height,
            "title": image##name
          }
        )
        images;
    let swipeOptions = {"index": self.state.currentImage};
    ReasonReact.createDomElement
      "div"
      props::{"className": "gallery"}
      [|
        ReasonReact.element (BreadCrumbs.make ::slug ::path ::name [||]),
        ReasonReact.element (GalleryBody.make renderedDescendants),
        ReasonReact.element (
          PhotoSwipe.make
            isOpen::self.state.lightboxIsOpen
            items::swipeImages
            onClose::(self.reduce (fun _event => CloseLightbox))
            options::swipeOptions
            [||]
        )
      |]
  }
};

let default =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          name::jsProps##name
          path::jsProps##path
          slug::jsProps##slug
          descendants::jsProps##descendants
          loadNextPage::jsProps##loadNextPage
          [||]
    );
