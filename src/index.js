// @flow
import React from "react";
import ReactDOM from "react-dom";
import "./style";
import { $$default as App } from "./app.re";
import fetch from "isomorphic-fetch";
import Raven from "./lib/raven";
import "react-photoswipe/lib/photoswipe.css";

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

let root = document.createElement("div");
document.body.insertBefore(root, document.body.firstChild);
ReactDOM.render(<App />, root);
