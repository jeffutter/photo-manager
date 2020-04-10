[@bs.module "react-photoswipe"]
external photoSwipe: ReasonReact.reactClass = "PhotoSwipe";

[@bs.val] [@bs.return nullable]
external _getElementById: string => option(Dom.element) =
  "document.getElementById";

[@react.component]
let make =
    (
      ~isOpen: bool=false,
      ~items: Js.Array.t('a),
      ~onClose,
      ~options,
    ) => {
    switch (_getElementById("modal-root")) {
    | None =>
      raise(
        Invalid_argument(
          "ReactDOMRE.renderToElementWithId : no element of id 'modal-root' found in the HTML.",
        ),
      )
    | Some(element) =>
      ReactDOMRe.createPortal(
        ReasonReact.wrapJsForReason(
          ~reactClass=photoSwipe,
          ~props={
            "isOpen": isOpen,
            "items": items,
            "onClose": onClose,
            "options": options,
          },
          [||],
        )
        |> ReasonReact.element,
        element,
      )
    }
};