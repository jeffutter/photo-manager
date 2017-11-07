open Glamor;

let component = ReasonReact.statelessComponent("Star");

let cls = css([cursor("pointer"), padding("0 2px")]);

let make = (~filled=false, ~index: int, ~handleClick, _children) => {
  ...component,
  render: (_self) => {
    let handleClickWithI = handleClick(index);
    filled ?
      <span className=cls onClick=handleClickWithI>
        (ReasonReact.stringToElement({j|★|j}))
      </span> :
      <span className=cls onClick=handleClickWithI>
        (ReasonReact.stringToElement({j|☆|j}))
      </span>
  }
};
