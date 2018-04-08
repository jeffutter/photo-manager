open Css;

let component = ReasonReact.statelessComponent("Star");

let cls =
  style([
    color(hex("828282")),
    cursor(`pointer),
    padding2(~h=px(2), ~v=zero),
  ]);

let star = filled => ReasonReact.stringToElement(filled ? {|★|} : {|☆|});

let make = (~filled=false, ~index: int, ~handleClick, _children) => {
  ...component,
  render: _self => {
    let handleClickWithI = handleClick(index);
    <span className=cls onClick=handleClickWithI> (star(filled)) </span>;
  },
};