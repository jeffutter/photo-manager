// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as InfiniteScroll$PhotoManager from "./InfiniteScroll.bs.js";

var component = ReasonReact.statelessComponent("GalleryBody");

var cls = Css.style(/* :: */[
      Css.margin4(Css.px(0), Css.auto, Css.px(40), Css.auto),
      /* [] */0
    ]);

function make(children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              return ReasonReact.element(/* None */0, /* None */0, InfiniteScroll$PhotoManager.make(/* Some */[cls], /* Some */[true], /* None */0, /* None */0, /* Some */[/* array */[
                                {
                                  mq: "0px",
                                  columns: 1,
                                  gutter: 32
                                },
                                {
                                  mq: (696).toString() + "px",
                                  columns: 2,
                                  gutter: 32
                                },
                                {
                                  mq: (1028).toString() + "px",
                                  columns: 3,
                                  gutter: 32
                                },
                                {
                                  mq: (1360).toString() + "px",
                                  columns: 4,
                                  gutter: 32
                                },
                                {
                                  mq: (1692).toString() + "px",
                                  columns: 5,
                                  gutter: 32
                                },
                                {
                                  mq: (1884).toString() + "px",
                                  columns: 5,
                                  gutter: 64
                                }
                              ]], children));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  cls ,
  make ,
  
}
/* component Not a pure module */
