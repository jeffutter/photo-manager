open Css;

let component = ReasonReact.statelessComponent("FullPageSpinner");

let containerCls =
  style([
    display(flexBox),
    flexDirection(column),
    justifyContent(center),
    height(`percent(100.0)),
  ]);

let bounceDelay =
  Css.keyframes([
    (0, [transform(scale(0.0, 0.0))]),
    (80, [transform(scale(0.0, 0.0))]),
    (100, [transform(scale(0.0, 0.0))]),
    (40, [transform(scale(1.0, 1.0))]),
  ]);

let spinnerCls =
  style([
    width(px(70)),
    margin2(~v=px(0), ~h=auto),
    textAlign(center),
    selector(
      "& > div",
      [
        width(px(18)),
        height(px(18)),
        backgroundColor(hex("333")),
        borderRadius(`percent(100.0)),
        display(inlineBlock),
        animationName(bounceDelay),
        animationDuration(1400),
        animationTimingFunction(easeInOut),
        animationIterationCount(infinite),
        animationFillMode(both),
      ],
    ),
  ]);

let bounce1Cls = style([animationDelay(320)]);

let bounce2Cls = style([animationDelay(160)]);

let make = _children => {
  ...component,
  render: _self =>
    <div className=containerCls>
      <div className=spinnerCls>
        <div className=bounce1Cls />
        <div className=bounce2Cls />
        <div />
      </div>
    </div>,
};

let default = ReasonReact.wrapReasonForJs(~component, (_) => make([||]));