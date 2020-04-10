open Css;

let cls =
  style([
    color(hex("828282")),
    cursor(`pointer),
    padding2(~h=px(2), ~v=zero),
  ]);

let star = filled => React.string(filled ? {j|★|j} : {j|☆|j});

[@react.component]
let make = (~filled=false, ~index: int, ~handleClick) => {
    let handleClickWithI = handleClick(index);

    <span className=cls onClick=handleClickWithI> (star(filled)) </span>;
};