let styles: Js.t 'a = [%bs.raw "require('./components/header/style.scss')"];

type state = {_open: bool};

type action =
  | ToggleNav;

let component = ReasonReact.reducerComponent "Header";

let make _children => {
  ...component,
  initialState: fun () => {_open: false},
  reducer: fun action state =>
    switch action {
    | ToggleNav => ReasonReact.Update {_open: not state._open}
    },
  render: fun self => {
    let headerClasses = [|styles##header|];
    let mobileToggleClasses = [|styles##mobileToggle|];
    if self.state._open {
      ignore (Js.Array.push styles##openNav headerClasses);
      ignore (Js.Array.push styles##openNavMobileToggle mobileToggleClasses)
    };
    <header className=(Js.Array.joinWith " " headerClasses)>
      <a className=styles##logo href="#"> (ReasonReact.stringToElement "Photo Gallery") </a>
      <div
        className=(Js.Array.joinWith " " mobileToggleClasses)
        onClick=(self.reduce (fun _event => ToggleNav))>
        <span />
        <span />
        <span />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              activeClassName=styles##active
              _to="/"
              onClick=(self.reduce (fun _event => ToggleNav))>
              (ReasonReact.stringToElement "Home")
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName=styles##active
              _to="/gallery"
              onClick=(self.reduce (fun _event => ToggleNav))>
              (ReasonReact.stringToElement "Gallery")
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName=styles##active
              _to="/logout"
              onClick=(self.reduce (fun _envent => ToggleNav))>
              (ReasonReact.stringToElement "Logout")
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  }
};

let default = ReasonReact.wrapReasonForJs ::component (fun _ => make [||]);
