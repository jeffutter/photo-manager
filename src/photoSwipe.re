external photoSwipe : ReasonReact.reactClass = "PhotoSwipe" [@@bs.module "react-photoswipe"];

let make isOpen::(isOpen: bool)=false items::(items: Js.Array.t 'a) ::onClose ::options children =>
  ReasonReact.wrapJsForReason
    reactClass::photoSwipe
    props::{
      "isOpen": Js.Boolean.to_js_boolean isOpen,
      "items": items,
      "onClose": onClose,
      "options": options
    }
    children;
