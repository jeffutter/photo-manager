// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css-emotion/src/Css.js";
import * as Json from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReactDOMRe from "../node_modules/reason-react/src/ReactDOMRe.js";
import * as Json_decode from "../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";
import * as ReactApollo from "react-apollo";
import * as App$PhotoManager from "./App.bs.js";
import * as ReasonReactRouter from "../node_modules/reason-react/src/ReasonReactRouter.js";
import * as Client$PhotoManager from "./Client.bs.js";
import * as Sentry$PhotoManager from "./Sentry.bs.js";
import * as RegisterServiceWorker from "./registerServiceWorker";

function registerServiceWorker(prim) {
  RegisterServiceWorker.register();
  return /* () */0;
}

function conf(json) {
  return /* record */[/* sentry_dsn */Json_decode.field("sentry_dsn", Json_decode.string, json)];
}

var Decode = {
  conf: conf
};

window.addEventListener("load", (function (param) {
        fetch("/config").then((function (prim) {
                      return prim.text();
                    })).then((function (text) {
                    return Promise.resolve(conf(Json.parseOrRaise(text)));
                  })).then((function (conf) {
                  Sentry$PhotoManager.init(conf[/* sentry_dsn */0]);
                  return Promise.resolve(/* () */0);
                })).catch((function (err) {
                console.log("Error loading Sentry. Bad response from server", err);
                return Promise.resolve(/* () */0);
              }));
        return /* () */0;
      }));

Curry._2(Css.$$global, "body, html", /* :: */[
      Css.fontFamily(/* `custom */[
            1066567601,
            "'Lato', sans-serif"
          ]),
      /* :: */[
        Css.fontWeight(/* `num */[
              5496390,
              300
            ]),
        /* :: */[
          Css.lineHeight(/* `abs */[
                4845682,
                1.5
              ]),
          /* :: */[
            Css.width(Css.pct(100.0)),
            /* :: */[
              Css.height(Css.pct(100.0)),
              /* :: */[
                Css.margin(Css.px(0)),
                /* :: */[
                  Css.backgroundColor(Css.hex("fafafa")),
                  /* :: */[
                    Css.color(Css.hex("333")),
                    /* [] */0
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

((require('react-photoswipe/dist/photoswipe.css')));

ReactDOMRe.renderToElementWithId(React.createElement(ReactApollo.ApolloProvider, {
          client: Client$PhotoManager.instance,
          children: React.createElement(App$PhotoManager.make, { })
        }), "app-root");

ReasonReactRouter.push("");

RegisterServiceWorker.register();

export {
  registerServiceWorker ,
  Decode ,
  
}
/*  Not a pure module */
