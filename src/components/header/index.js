// @flow
import React, { Component } from "react";
import style from "./style";
import { Link } from "react-router-dom";

type Props = {};
type State = {
  open: boolean
};

export default class Header extends Component<Props, State> {
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
              <Link
                activeClassName={style.active}
                to="/"
                onClick={this.toggleNav}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                activeClassName={style.active}
                to="/gallery"
                onClick={this.toggleNav}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                activeClassName={style.active}
                to="/logout"
                onClick={this.toggleNav}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
