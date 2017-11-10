open Glamor;

let headerCls =
  css([
    position("fixed"),
    top("0"),
    left("0"),
    minHeight("62px"),
    maxHeight("62px"),
    zIndex("999"),
    width("100%"),
    background("#579591"),
    overflow("hidden"),
    transition("all 0.3s"),
    fontFamily("\"Montserrat\", sans-serif"),
    backgroundColor("rgba(255, 255, 255, 0.95)"),
    borderBottom("1px solid gainsboro")
  ]);

let mobileToggleCls =
  css([
    display("none"),
    cursor("pointer"),
    fontSize("20px"),
    position("absolute"),
    right("22px"),
    top("0"),
    width("30px"),
    transform("rotate(0deg)"),
    transition(".5s ease-in-out"),
    zIndex("1000"),
    Selector(
      "& span",
      [
        width("30px"),
        height("4px"),
        marginBottom("6px"),
        borderRadius("1000px"),
        background("#8f8f8f"),
        display("block")
      ]
    ),
    Selector("@media only screen and (max-width: 766px)", [display("block"), top("18px")])
  ]);

let openNavCls =
  css([maxHeight("440px !important"), Selector(".mobileToggle", [transform("rotate(-90deg)")])]);

let logoCls =
  css([
    fontSize("25px"),
    color("#8f8f8f"),
    textTransform("uppercase"),
    display("inline-block"),
    margin("18px 0 18px 10px"),
    lineHeight("1"),
    textDecoration("none"),
    width("auto"),
    Selector("@media only screen and (max-width: 766px)", [cssFloat("none")])
  ]);

let navCls =
  css([
    cssFloat("right"),
    width("60%"),
    height("100%"),
    marginRight("10px"),
    Selector("@media only screen and (max-width: 766px)", [width("100%"), margin("0")]),
    Selector(
      "& ul",
      [
        height("100%"),
        listStyle("none"),
        overflow("hidden"),
        textAlign("right"),
        cssFloat("right"),
        padding("0"),
        margin("0"),
        Selector(
          "@media only screen and (max-width: 766px)",
          [
            paddingTop("10px"),
            marginBottom("22px"),
            cssFloat("left"),
            textAlign("center"),
            width("100%")
          ]
        ),
        Selector(
          "& li",
          [
            height("100%"),
            display("inline-block"),
            position("relative"),
            marginLeft("35px"),
            lineHeight("1.5"),
            Selector(
              "@media only screen and (max-width: 766px)",
              [width("100%"), padding("7px 0"), margin("0")]
            )
          ]
        ),
        Selector(
          "& a",
          [
            display("block"),
            verticalAlign("middle"),
            color("#888888"),
            textTransform("uppercase"),
            fontSize("16px"),
            textDecoration("none"),
            padding("20px 20px"),
            Selector("&:hover, &:active", [color("#fff"), background("rgba(0, 0, 0, 0.2)")]),
            Selector("&.active", [color("#fff"), background("rgba(0, 0, 0, 0.3)")])
          ]
        )
      ]
    )
  ]);

let activeCls = css([]);

let openNavMobileToggle = css([transform("rotate(90deg)")]);

type state = {_open: bool};

type action =
  | ToggleNav;

let component = ReasonReact.reducerComponent("Header");

let make = (_children) => {
  ...component,
  initialState: () => {_open: false},
  reducer: (action, state) =>
    switch action {
    | ToggleNav => ReasonReact.Update({_open: ! state._open})
    },
  render: (self) => {
    let headerClasses = [|headerCls|];
    let mobileToggleClasses = [|mobileToggleCls|];
    if (self.state._open) {
      ignore(Js.Array.push(openNavCls, headerClasses));
      ignore(Js.Array.push(openNavMobileToggle, mobileToggleClasses))
    };
    <header className=(Js.Array.joinWith(" ", headerClasses))>
      <a className=logoCls href="#"> (ReasonReact.stringToElement("Photo Gallery")) </a>
      <div
        className=(Js.Array.joinWith(" ", mobileToggleClasses))
        onClick=(self.reduce((_event) => ToggleNav))>
        <span />
        <span />
        <span />
      </div>
      <nav className=navCls>
        <ul>
          <li>
            <ReactRouterDom.NavLink
              activeClassName=activeCls _to="/" onClick=(self.reduce((_event) => ToggleNav))>
              (ReasonReact.stringToElement("Home"))
            </ReactRouterDom.NavLink>
          </li>
          <li>
            <ReactRouterDom.NavLink
              activeClassName=activeCls
              _to="/gallery"
              onClick=(self.reduce((_event) => ToggleNav))>
              (ReasonReact.stringToElement("Gallery"))
            </ReactRouterDom.NavLink>
          </li>
          <li>
            <ReactRouterDom.NavLink
              activeClassName=activeCls
              _to="/logout"
              onClick=(self.reduce((_envent) => ToggleNav))>
              (ReasonReact.stringToElement("Logout"))
            </ReactRouterDom.NavLink>
          </li>
        </ul>
      </nav>
    </header>
  }
};

let default = ReasonReact.wrapReasonForJs(~component, (_) => make([||]));