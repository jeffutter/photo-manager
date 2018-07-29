// Generated by BUCKLESCRIPT VERSION 4.0.2, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";

var component = ReasonReact.statelessComponent("FullPageSpinner");

var containerCls = Css.style(/* :: */[
      Css.display(Css.flexBox),
      /* :: */[
        Css.flexDirection(Css.column),
        /* :: */[
          Css.justifyContent(Css.center),
          /* :: */[
            Css.height(/* `percent */[
                  -119887163,
                  100.0
                ]),
            /* [] */0
          ]
        ]
      ]
    ]);

var bounceDelay = Css.keyframes(/* :: */[
      /* tuple */[
        0,
        /* :: */[
          Css.transform(Css.scale(0.0, 0.0)),
          /* [] */0
        ]
      ],
      /* :: */[
        /* tuple */[
          80,
          /* :: */[
            Css.transform(Css.scale(0.0, 0.0)),
            /* [] */0
          ]
        ],
        /* :: */[
          /* tuple */[
            100,
            /* :: */[
              Css.transform(Css.scale(0.0, 0.0)),
              /* [] */0
            ]
          ],
          /* :: */[
            /* tuple */[
              40,
              /* :: */[
                Css.transform(Css.scale(1.0, 1.0)),
                /* [] */0
              ]
            ],
            /* [] */0
          ]
        ]
      ]
    ]);

var spinnerCls = Css.style(/* :: */[
      Css.width(Css.px(70)),
      /* :: */[
        Css.margin2(Css.px(0), Css.auto),
        /* :: */[
          Css.textAlign(Css.center),
          /* :: */[
            Css.selector("& > div", /* :: */[
                  Css.width(Css.px(18)),
                  /* :: */[
                    Css.height(Css.px(18)),
                    /* :: */[
                      Css.backgroundColor(Css.hex("333")),
                      /* :: */[
                        Css.borderRadius(/* `percent */[
                              -119887163,
                              100.0
                            ]),
                        /* :: */[
                          Css.display(Css.inlineBlock),
                          /* :: */[
                            Css.animationName(bounceDelay),
                            /* :: */[
                              Css.animationDuration(1400),
                              /* :: */[
                                Css.animationTimingFunction(Css.easeInOut),
                                /* :: */[
                                  Css.animationIterationCount(Css.infinite),
                                  /* :: */[
                                    Css.animationFillMode(Css.both),
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]),
            /* [] */0
          ]
        ]
      ]
    ]);

var bounce1Cls = Css.style(/* :: */[
      Css.animationDelay(320),
      /* [] */0
    ]);

var bounce2Cls = Css.style(/* :: */[
      Css.animationDelay(160),
      /* [] */0
    ]);

function make() {
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
              return React.createElement("div", {
                          className: containerCls
                        }, React.createElement("div", {
                              className: spinnerCls
                            }, React.createElement("div", {
                                  className: bounce1Cls
                                }), React.createElement("div", {
                                  className: bounce2Cls
                                }), React.createElement("div", undefined)));
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
  containerCls ,
  bounceDelay ,
  spinnerCls ,
  bounce1Cls ,
  bounce2Cls ,
  make ,
  
}
/* component Not a pure module */
