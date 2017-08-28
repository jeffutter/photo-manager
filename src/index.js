// @flow
import "./style";
import App from "./components/app";
import fetch from "isomorphic-fetch";
import Raven from "./lib/raven";

fetch("/config")
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(config) {
    Raven.config(config.sentry_dsn).install();
  });

export default App;
