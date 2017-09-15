// @flow
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from "../lib/client";

import { $$default as Header } from "../header.re";
import Gallery from "../routes/gallery";

import style from "./style";
import { loggedIn } from "../lib/cookies";

import Login from "./login_form";
import logout from "../lib/logout";

const Logout = () => {
  logout();
  return <Redirect to="/" />;
};

type appProps = {
  children: React$Element<*>
};
const App = ({ children }: appProps) => {
  return (
    <div id="app" className={style.app}>
      <Header />
      {children}
    </div>
  );
};

/**
 * The Main App Component
 * @return {ReactElement}
 */
export default function Application() {
  let routes = [
    <Route key={1} exact path="/login" component={Login} />,
    <Route key={2} exact path="/logout" component={Logout} />
  ];

  if (loggedIn()) {
    routes = routes.concat([
      <App key={3}>
        <Route path="/gallery/:slug?" component={Gallery} />
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/gallery" />;
          }}
        />
      </App>
    ]);
  } else {
    routes.push(<Redirect key={3} from="/" to="/login" />);
    localStorage.setItem("loginFlash", "Your login has expired or is invalid.");
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>{routes}</div>
      </Router>
    </ApolloProvider>
  );
}
