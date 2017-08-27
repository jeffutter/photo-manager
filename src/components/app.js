// @flow
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ApolloProvider, withApollo } from "react-apollo";
import client from "../lib/client";

import Header from "./header";
import Gallery from "../routes/gallery";

import style from "./style";
import { eraseCookie, loggedIn } from "../lib/cookies";

import Login from "./login_form";
import logout from "../lib/logout";

const Logout = ({ client }) => {
  logout();
  return <Redirect to="/" />;
};

const App = ({ children }) => {
  return (
    <div id="app" class={style.app}>
      <Header />
      {children}
    </div>
  );
};

export default () => {
  let routes = [
    <Route exact path="/login" component={Login} />,
    <Route exact path="/logout" component={Logout} />
  ];

  if (loggedIn()) {
    routes = routes.concat([
      <App>
        <Route path="/gallery/:slug?" component={Gallery} />
        <Route
          exact
          path="/"
          render={() => {
            <Redirect to="/gallery" />;
          }}
        />
      </App>
    ]);
  } else {
    routes.push(<Redirect from="/" to="/login" />);
    localStorage.setItem("loginFlash", "Your login has expired or is invalid.");
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {routes}
        </div>
      </Router>
    </ApolloProvider>
  );
};
