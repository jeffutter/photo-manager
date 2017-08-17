import { h, Component } from "preact";
import style from "./style";
import { Link } from "react-router-dom";

export default class Header extends Component {
  state = {
    open: false
  };

  toggleNav = () => {
    this.setState(state => {
      return Object.assign({}, state, {
        open: !state.open
      });
    });
  };

  render() {
    const headerClasses = [style.header];
    if (this.state.open) headerClasses.push(style.openNav);
    const mobileToggleClasses = [style.mobileToggle];
    if (this.state.open) mobileToggleClasses.push(style.openNavMobileToggle);

    return (
      <header class={headerClasses.join(" ")}>
        <a class={style.logo} href="#">
          Photo Gallery
        </a>
        <div class={mobileToggleClasses.join(" ")} onClick={this.toggleNav}>
          <span />
          <span />
          <span />
        </div>
        <nav>
          <ul>
            <li>
              <Link activeClassName={style.active} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link activeClassName={style.active} to="/gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link activeClassName={style.active} to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
