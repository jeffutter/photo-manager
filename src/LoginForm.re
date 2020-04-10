open Css;

let baseLogoCls =
  style([
    position(relative),
    paddingRight(px(8)),
    selector("& path", [SVG.fill(hex("fff"))]),
    verticalAlign(middle),
  ]);

let facebookCls = baseLogoCls;

let googleCls = baseLogoCls;

let loginButtonBefore = [
  unsafe("content", "''"),
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
    Shadow.box(
      ~x=zero,
      ~y=zero,
      ~blur=zero,
      ~spread=px(32),
      ~inset=true,
      rgba(0, 0, 0, 0.1),
    ),
  ),
];

let loginButton = [
  boxSizing(borderBox),
  position(relative),
  margin(em(0.2)),
  padding2(~v=px(4), ~h=px(8)),
  border(px(0), none, black),
  textAlign(`left),
  whiteSpace(`nowrap),
  borderRadius(em(0.2)),
  fontSize(px(16)),
  color(hex("FFF")),
  display(block),
  selector(
    "> span",
    [unsafe("lineHeight", "28px"), verticalAlign(middle)],
  ),
];

let facebookButtonBefore =
  List.concat([
    loginButtonBefore,
    [borderRight(px(1), `solid, hex("364e92"))],
  ]);

let googleButtonBefore =
  List.concat([
    loginButtonBefore,
    [borderRight(px(1), `solid, hex("BB3F30"))],
  ]);

let facebookButtonFocus =
  List.concat([
    loginButtonFocus,
    [
      backgroundColor(hex("5B7BD5")),
      backgroundImage(
        linearGradient(
          deg(180.0),
          [
            (`percent(0.0), hex("5B7BD5")),
            (`percent(100.0), hex("4864B1")),
          ],
        ),
      ),
    ],
  ]);

let googleButtonFocus =
  List.concat([loginButtonFocus, [backgroundColor(hex("E74B37"))]]);

let loginButtonFacebookCls =
  merge([
    style(loginButton),
    style([
      backgroundColor(hex("4C69BA")),
      backgroundImage(
        linearGradient(
          deg(180.0),
          [
            (`percent(0.0), hex("4C69BA")),
            (`percent(100.0), hex("3B55A0")),
          ],
        ),
      ),
      textShadow(
        Shadow.text(~x=px(0), ~y=px(-1), ~blur=zero, hex("354C8C")),
      ),
      selector("&:active", loginButtonActive),
      selector("&:before", facebookButtonBefore),
      selector("&:hover, &:focus", facebookButtonFocus),
    ]),
  ]);

let loginButtonGoogleCls =
  merge([
    style(loginButton),
    style([
      backgroundColor(hex("DD4B39")),
      textShadow(
        Shadow.text(~x=px(0), ~y=px(-1), ~blur=zero, hex("354C8C")),
      ),
      selector("&:active", loginButtonActive),
      selector("&:before", googleButtonBefore),
      selector("&:hover, &:focus", googleButtonFocus),
    ]),
  ]);

let centerCls =
  style([
    margin(auto),
    position(absolute),
    top(px(-80)),
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
  merge([
    style(statusCls),
    style([color(hex("059")), backgroundColor(hex("BEF"))]),
  ]);

let successCls =
  merge([
    style(statusCls),
    style([color(hex("270")), backgroundColor(hex("DFF2BF"))]),
  ]);

let warningCls =
  merge([
    style(statusCls),
    style([color(hex("9F6000")), backgroundColor(hex("FEEFB3"))]),
  ]);

let errorCls =
  merge([
    style(statusCls),
    style([color(hex("D8000C")), backgroundColor(hex("FFBABA"))]),
  ]);

let loginWarning = () =>
  switch (Dom.Storage.getItem("loginFlash", Dom.Storage.localStorage)) {
  | Some(message) =>
    Dom.Storage.removeItem("loginFlash", Dom.Storage.localStorage);
    <div className=warningCls>
      <svg width="18" height="18" viewBox="0 0 1792 1792">
        <path
          d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
        />
      </svg>
      {React.string(message)}
    </div>;
  | None => <span />
  };

[@react.component]
let make = () => {
  <div className=centerCls>
    {loginWarning()}
    <div>
      <a className=loginButtonFacebookCls href="/__auth/facebook">
        <svg
          viewBox="0 0 1792 1792" width="22" height="22" className=facebookCls>
          <path
            d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"
          />
        </svg>
        <span> {React.string("Login with Facebook")} </span>
      </a>
    </div>
    <div>
      <a className=loginButtonGoogleCls href="/__auth/google">
        <svg
          viewBox="0 0 1792 1792" width="22" height="22" className=googleCls>
          <path
            d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
          />
        </svg>
        <span> {React.string("Login with Google")} </span>
      </a>
    </div>
  </div>;
};
/* selector("&:before", loginButtonBefore),
   selector("&:focus", loginButtonFocus),
   selector("&:active", loginButtonActive), */