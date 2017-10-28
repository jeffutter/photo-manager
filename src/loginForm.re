open Glamor;

let component = ReasonReact.statelessComponent("LoginForm");

let facebookCls =
  css([position("relative"), top("5px"), paddingRight("8px"), Selector("path", [fill("#fff")])]);

let loginButtonCls =
  css([
    boxSizing("border-box"),
    position("relative"),
    margin("0.2em"),
    padding("8px"),
    border("none"),
    textAlign("left"),
    lineHeight("34px"),
    whiteSpace("nowrap"),
    borderRadius("0.2em"),
    fontSize("16px"),
    color("#FFF"),
    Selector(
      "&:before",
      [
        content("''"),
        boxSizing("border-box"),
        position("absolute"),
        top("0"),
        left("0"),
        width("34px"),
        height("100%")
      ]
    ),
    Selector("&:focus", [outline("none")]),
    Selector("&:active", [boxShadow("inset 0 0 0 32px rgba(0,0,0,0.1)")])
  ]);

let loginButtonFacebookCls =
  css([
    backgroundColor("#4C69BA"),
    backgroundImage("linear-gradient(#4C69BA, #3B55A0)"),
    textShadow("0 -1px 0 #354C8C"),
    Selector("&:before", [borderRight("#364e92 1px solid")]),
    Selector(
      "&:hover, &:focus",
      [backgroundColor("#5B7BD5"), backgroundImage("linear-gradient(#5B7BD5, #4864B1)")]
    )
  ]);

let centerCls =
  css([
    margin("auto"),
    position("absolute"),
    top("0"),
    left("0"),
    bottom("0"),
    right("0"),
    height("36px"),
    width("200px"),
    Selector("a", [textDecoration("none")])
  ]);

let statusCls = css([margin("10px 0"), padding("10px"), borderRadius("3px 3px 3px 3px")]);

let infoCls = merge([statusCls, css([color("#059"), backgroundColor("#BEF")])]);

let successCls = merge([statusCls, css([color("#270"), backgroundColor("#DFF2BF")])]);

let warningCls = merge([statusCls, css([color("#9F6000"), backgroundColor("#FEEFB3")])]);

let errorCls = merge([statusCls, css([color("#D8000C"), backgroundColor("#FFBABA")])]);

let make = (_children) => {
  ...component,
  render: (_self) =>
    Cookies.loggedIn() ?
      <ReactRouterDom.Redirect _to="/" /> :
      {
        let loginWarning =
          switch (Dom.Storage.getItem("loginFlash", Dom.Storage.localStorage)) {
          | Some(message) =>
            Dom.Storage.removeItem("loginFlash", Dom.Storage.localStorage);
            <div className=warningCls>
              <svg width="18" height="18" viewBox="0 0 1792 1792">
                <path
                  d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
                />
              </svg>
              (ReasonReact.stringToElement(message))
            </div>
          | None => <span />
          };
        <div className=centerCls>
          loginWarning
          <a
            className=(Js.Array.joinWith(" ", [|loginButtonCls, loginButtonFacebookCls|]))
            href="/auth/facebook">
            <svg viewBox="0 0 33 33" width="22" height="22" className=facebookCls>
              <path
                d="M 17.996,32L 12,32 L 12,16 l-4,0 l0-5.514 l 4-0.002l-0.006-3.248C 11.993,2.737, 13.213,0, 18.512,0l 4.412,0 l0,5.515 l-2.757,0 c-2.063,0-2.163,0.77-2.163,2.209l-0.008,2.76l 4.959,0 l-0.585,5.514L 18,16L 17.996,32z"
              />
            </svg>
            <span> (ReasonReact.stringToElement("Login With Facebook")) </span>
          </a>
        </div>
      }
};

let default = ReasonReact.wrapReasonForJs(~component, (_) => make([||]));
