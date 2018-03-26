open Css;

let component = ReasonReact.statelessComponent("LoginForm");

let facebookCls =
  style([
    position(relative),
    top(px(5)),
    paddingRight(px(8)),
    selector("& path", [SVG.fill(hex("fff"))]),
  ]);

let loginButtonBefore = [
  `declaration(("content", "''")),
  boxSizing(borderBox),
  position(absolute),
  top(zero),
  left(zero),
  width(px(34)),
  height(`percent(100.0)),
];

let loginButtonFocus = [outline(px(0), `none, black)];

let loginButtonActive = [
  boxShadow(
    ~x=zero,
    ~y=zero,
    ~blur=zero,
    ~spread=px(32),
    ~inset=true,
    rgba(0, 0, 0, 0.1),
  ),
];

let loginButtonCls = [
  boxSizing(borderBox),
  position(relative),
  margin(em(0.2)),
  padding(px(8)),
  border(px(0), none, black),
  textAlign(`left),
  whiteSpace(`nowrap),
  borderRadius(em(0.2)),
  fontSize(px(16)),
  color(hex("FFF")),
  /* selector("&:before", loginButtonBefore),
     selector("&:focus", loginButtonFocus),
     selector("&:active", loginButtonActive), */
];

let facebookButtonBefore =
  merge([loginButtonBefore, [borderRight(px(1), `solid, hex("364e92"))]]);

let faceebookButtonFocus =
  merge([
    loginButtonFocus,
    [
      backgroundColor(hex("5B7BD5")),
      backgroundImage(
        linearGradient(
          deg(180),
          [(0, hex("5B7BD5")), (100, hex("4864B1"))],
        ),
      ),
    ],
  ]);

let loginButtonFacebookCls =
  style(
    merge([
      loginButtonCls,
      [
        backgroundColor(hex("4C69BA")),
        backgroundImage(
          linearGradient(
            deg(180),
            [(0, hex("4C69BA")), (100, hex("3B55A0"))],
          ),
        ),
        textShadow(~x=px(0), ~y=px(-1), ~blur=zero, hex("354C8C")),
        selector("&:active", loginButtonActive),
        selector("&:before", facebookButtonBefore),
        selector("&:hover, &:focus", faceebookButtonFocus),
      ],
    ]),
  );

let centerCls =
  style([
    margin(auto),
    position(absolute),
    top(zero),
    left(zero),
    bottom(zero),
    right(zero),
    height(px(36)),
    width(px(200)),
    selector("& a", [textDecoration(none)]),
  ]);

let statusCls = [
  margin2(~h=px(10), ~v=px(0)),
  padding(px(10)),
  borderRadius(px(3)),
];

let infoCls =
  merge([statusCls, [color(hex("059")), backgroundColor(hex("BEF"))]]);

let successCls =
  merge([
    statusCls,
    [color(hex("270")), backgroundColor(hex("DFF2BF"))],
  ]);

let warningCls =
  merge([
    statusCls,
    [color(hex("9F6000")), backgroundColor(hex("FEEFB3"))],
  ]);

let errorCls =
  merge([
    statusCls,
    [color(hex("D8000C")), backgroundColor(hex("FFBABA"))],
  ]);

let make = _children => {
  ...component,
  render: _self =>
    Cookies.loggedIn() ?
      <ReactRouterDom.Redirect _to="/" /> :
      {
        let loginWarning =
          switch (Dom.Storage.getItem("loginFlash", Dom.Storage.localStorage)) {
          | Some(message) =>
            Dom.Storage.removeItem("loginFlash", Dom.Storage.localStorage);
            <div className=(style(warningCls))>
              <svg width="18" height="18" viewBox="0 0 1792 1792">
                <path
                  d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
                />
              </svg>
              (ReasonReact.stringToElement(message))
            </div>;
          | None => <span />
          };
        <div className=centerCls>
          loginWarning
          <a className=loginButtonFacebookCls href="/__auth/facebook">
            <svg
              viewBox="0 0 33 33" width="22" height="22" className=facebookCls>
              <path
                d="M 17.996,32L 12,32 L 12,16 l-4,0 l0-5.514 l 4-0.002l-0.006-3.248C 11.993,2.737, 13.213,0, 18.512,0l 4.412,0 l0,5.515 l-2.757,0 c-2.063,0-2.163,0.77-2.163,2.209l-0.008,2.76l 4.959,0 l-0.585,5.514L 18,16L 17.996,32z"
              />
            </svg>
            <span>
              (ReasonReact.stringToElement("Login With Facebook"))
            </span>
          </a>
        </div>;
      },
};

let default = ReasonReact.wrapReasonForJs(~component, (_) => make([||]));