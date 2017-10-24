open Glamor;

let component = ReasonReact.statelessComponent "FullPageSpinner";

let containerCls =
  css [display "flex", flexDirection "column", justifyContent "center", height "100%"];

let bounceDelay =
  Glamor.keyframes [("0%, 80%, 100%", [transform "scale(0)"]), ("40%", [transform "scale(1.0)"])];

let spinnerCls =
  css [
    width "70px",
    margin "0 auto",
    textAlign "center",
    Selector
      "& > div"
      [
        width "18px",
        height "18px",
        backgroundColor "#333",
        borderRadius "100%",
        display "inline-block",
        animationName bounceDelay,
        animationDuration "1.4s",
        animationTimingFunction "ease-in-out",
        animationIterationCount "infinite",
        animationFillMode "both"
      ]
  ];

let bounce1Cls = css [animationDelay "-0.32s"];

let bounce2Cls = css [animationDelay "-0.16s"];

let make _children => {
  ...component,
  render: fun _self =>
    <div className=containerCls>
      <div className=spinnerCls>
        <div className=bounce1Cls />
        <div className=bounce2Cls />
        <div />
      </div>
    </div>
};

let default = ReasonReact.wrapReasonForJs ::component (fun _ => make [||]);
