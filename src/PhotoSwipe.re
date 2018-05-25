[@bs.module "react-photoswipe"]
external photoSwipe : ReasonReact.reactClass = "PhotoSwipe";

let make =
    (
      ~isOpen: bool=false,
      ~items: Js.Array.t('a),
      ~onClose,
      ~options,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=photoSwipe,
    ~props={
      "isOpen": isOpen,
      "items": items,
      "onClose": onClose,
      "options": options,
    },
    children,
  );