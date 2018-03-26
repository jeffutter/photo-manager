open Css;

let headerCls =
  style([
    position(fixed),
    top(zero),
    left(zero),
    minHeight(px(62)),
    maxHeight(px(62)),
    zIndex(999),
    width(`percent(100.0)),
    overflow(hidden),
    transition(~duration=300, "all"),
    fontFamily("\"Montserrat\", sans-serif"),
    backgroundColor(rgba(255, 255, 255, 0.95)),
    borderBottom(px(1), solid, gainsboro),
  ]);

let mobileToggleCls =
  style([
    display(none),
    cursor(`pointer),
    fontSize(px(20)),
    position(absolute),
    right(px(22)),
    top(zero),
    width(px(30)),
    transform(rotate(deg(0))),
    transition(~duration=500, ~timingFunction=easeInOut, "all"),
    zIndex(1000),
    selector(
      "& span",
      [
        width(px(30)),
        height(px(4)),
        marginBottom(px(6)),
        borderRadius(px(1000)),
        background(hex("8f8f8f")),
        display(block),
      ],
    ),
    selector(
      "@media only screen and (max-width: 766px)",
      [display(block), top(px(18))],
    ),
  ]);

let openNavCls =
  style([
    important(maxHeight(px(440))),
    selector(".mobileToggle", [transform(rotate(deg(-90)))]),
  ]);

let logoCls =
  style([
    fontSize(px(25)),
    color(hex("8f8f8f")),
    textTransform(uppercase),
    display(inlineBlock),
    margin4(~top=px(18), ~right=zero, ~bottom=px(18), ~left=px(10)),
    lineHeight(1.0),
    textDecoration(none),
    width(auto),
    selector(
      "@media only screen and (max-width: 766px)",
      [Css.float(none)],
    ),
  ]);

let navCls =
  style([
    Css.float(`right),
    width(`percent(60.0)),
    height(`percent(100.0)),
    marginRight(px(10)),
    selector(
      "@media only screen and (max-width: 766px)",
      [width(`percent(100.0)), margin(zero)],
    ),
    selector(
      "& ul",
      [
        height(`percent(100.0)),
        listStyle(`disc, `inside, `none),
        overflow(hidden),
        textAlign(`right),
        Css.float(`right),
        padding(zero),
        margin(zero),
        selector(
          "@media only screen and (max-width: 766px)",
          [
            paddingTop(px(10)),
            marginBottom(px(22)),
            Css.float(`left),
            textAlign(center),
            width(`percent(100.0)),
          ],
        ),
        selector(
          "& li",
          [
            height(`percent(100.0)),
            display(inlineBlock),
            position(relative),
            marginLeft(px(35)),
            lineHeight(1.5),
            selector(
              "@media only screen and (max-width: 766px)",
              [
                width(`percent(100.0)),
                padding2(~h=px(7), ~v=zero),
                margin(zero),
              ],
            ),
          ],
        ),
        selector(
          "& a",
          [
            display(block),
            verticalAlign(middle),
            color(hex("888888")),
            textTransform(uppercase),
            fontSize(px(16)),
            textDecoration(none),
            padding(px(20)),
            selector(
              "&:hover, &:active",
              [color(hex("fff")), background(rgba(0, 0, 0, 0.2))],
            ),
            selector(
              "&.active",
              [color(hex("fff")), background(rgba(0, 0, 0, 0.3))],
            ),
          ],
        ),
      ],
    ),
  ]);

let activeCls = style([]);

let openNavMobileToggle = style([transform(rotate(deg(90)))]);

type state = {_open: bool};

type action =
  | ToggleNav;

let component = ReasonReact.reducerComponent("Header");

let make = _children => {
  ...component,
  initialState: () => {_open: false},
  reducer: (action, state) =>
    switch (action) {
    | ToggleNav => ReasonReact.Update({_open: ! state._open})
    },
  render: self => {
    let headerClasses = [|headerCls|];
    let mobileToggleClasses = [|mobileToggleCls|];
    if (self.state._open) {
      ignore(Js.Array.push(openNavCls, headerClasses));
      ignore(Js.Array.push(openNavMobileToggle, mobileToggleClasses));
    };
    <header className=(Js.Array.joinWith(" ", headerClasses))>
      <a className=logoCls href="#">
        (ReasonReact.stringToElement("Photo Gallery"))
      </a>
      <div
        className=(Js.Array.joinWith(" ", mobileToggleClasses))
        onClick=(self.reduce(_event => ToggleNav))>
        <span />
        <span />
        <span />
      </div>
      <nav className=navCls>
        <ul>
          <li>
            <ReactRouterDom.NavLink
              activeClassName=activeCls
              _to="/"
              onClick=(self.reduce(_event => ToggleNav))>
              (ReasonReact.stringToElement("Home"))
            </ReactRouterDom.NavLink>
          </li>
          <li>
            <ReactRouterDom.NavLink
              activeClassName=activeCls
              _to="/gallery"
              onClick=(self.reduce(_event => ToggleNav))>
              (ReasonReact.stringToElement("Gallery"))
            </ReactRouterDom.NavLink>
          </li>
          <li>
            <ReactRouterDom.NavLink
              activeClassName=activeCls
              _to="/logout"
              onClick=(self.reduce(_envent => ToggleNav))>
              (ReasonReact.stringToElement("Logout"))
            </ReactRouterDom.NavLink>
          </li>
        </ul>
      </nav>
    </header>;
  },
};

let default = ReasonReact.wrapReasonForJs(~component, (_) => make([||]));