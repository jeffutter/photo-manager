// @flow
import React, { Component } from "react";
import style from "./style";
import { NavLink } from "react-router-dom";

type Props = {};
type State = {
  open: boolean
};

/**
 * Header Component
 */
export default class Header extends Component<Props, State> {
  state = {
    open: false
  };

  /**
   * Toggles the Navigation
   */
  toggleNav() {
    this.setState(state => {
      return Object.assign({}, state, {
        open: !state.open
      });
    });
  }

  /**
   * Renders the Header Component
   * @return {ReactElement}
   */
  render() {
    const headerClasses = [style.header];
    if (this.state.open) headerClasses.push(style.openNav);
    const mobileToggleClasses = [style.mobileToggle];
    if (this.state.open) mobileToggleClasses.push(style.openNavMobileToggle);

    return (
      <header className={headerClasses.join(" ")}>
        <a className={style.logo} href="#">
          Photo Gallery
        </a>
        <div className={mobileToggleClasses.join(" ")} onClick={this.toggleNav}>
          <span />
          <span />
          <span />
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                activeClassName={style.active}
                to="/"
                onClick={this.toggleNav}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={style.active}
                to="/gallery"
                onClick={this.toggleNav}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName={style.active}
                to="/logout"
                onClick={this.toggleNav}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
