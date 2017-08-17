import { h, Component } from "preact";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ApolloProvider, withApollo } from "react-apollo";
import client from "../lib/client";

import Header from "./header";
import Gallery from "../routes/gallery";

import style from "./style";
import { eraseCookie, loggedIn } from "../lib/cookies";

import Login from "./login_form";

const logout = () => {
  eraseCookie("access_token");
  client.resetStore();
};

const Logout = ({ client }) => {
  logout();
  return <Redirect to="/" />;
};

const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const isAuthenticated = loggedIn();
  if (!isAuthenticated)
    localStorage.setItem("loginFlash", "Your login has expired or is invalid.");
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated
          ? <Component {...props}>
              {children}
            </Component>
          : <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />}
    />
  );
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/" component={App}>
            <Route exact path="/gallery" component={Gallery} />
            <Route path="/gallery/:slug" component={Gallery} />
          </PrivateRoute>
        </div>
      </Router>
    </ApolloProvider>
  );
};
