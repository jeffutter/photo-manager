// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";

function cls(lightBG) {
  return Css.style(/* :: */[
              Css.width(Css.px(300)),
              /* :: */[
                Css.maxWidth(Css.px(300)),
                /* :: */[
                  /* `declaration */[
                    -434952966,
                    /* tuple */[
                      "position",
                      "inherit"
                    ]
                  ],
                  /* :: */[
                    Css.boxSizing(Css.borderBox),
                    /* :: */[
                      Css.color(Css.hex("fff")),
                      /* :: */[
                        Css.backgroundSize(Css.cover),
                        /* :: */[
                          /* `declaration */[
                            -434952966,
                            /* tuple */[
                              "backgroundPosition",
                              "center"
                            ]
                          ],
                          /* :: */[
                            Css.boxShadow(/* Some */[Css.px(-2)], /* Some */[Css.px(2)], /* Some */[Css.px(10)], /* Some */[Css.px(0)], /* None */0, Css.rgba(68, 68, 68, 0.4)),
                            /* :: */[
                              Css.transition(/* Some */[300], /* None */0, /* Some */[/* easeInOut */-960651557], "transform"),
                              /* :: */[
                                Css.cursor(/* pointer */-786317123),
                                /* :: */[
                                  /* `declaration */[
                                    -434952966,
                                    /* tuple */[
                                      "counterIncrement",
                                      "item-counter"
                                    ]
                                  ],
                                  /* :: */[
                                    Css.selector("@media screen and (min-width: 768px)", /* :: */[
                                          Css.selector(":hover", /* :: */[
                                                Css.transform(Css.scale(1.05, 1.05)),
                                                /* [] */0
                                              ]),
                                          /* [] */0
                                        ]),
                                    /* :: */[
                                      Css.selector("&:after", lightBG ? /* [] */0 : /* :: */[
                                              /* `declaration */[
                                                -434952966,
                                                /* tuple */[
                                                  "content",
                                                  "''"
                                                ]
                                              ],
                                              /* :: */[
                                                Css.position(Css.absolute),
                                                /* :: */[
                                                  Css.top(Css.zero),
                                                  /* :: */[
                                                    Css.left(Css.zero),
                                                    /* :: */[
                                                      Css.width(/* `percent */[
                                                            -119887163,
                                                            100.0
                                                          ]),
                                                      /* :: */[
                                                        Css.height(/* `percent */[
                                                              -119887163,
                                                              100.0
                                                            ]),
                                                        /* :: */[
                                                          Css.backgroundColor(Css.black),
                                                          /* :: */[
                                                            Css.opacity(0.2),
                                                            /* :: */[
                                                              Css.transition(/* None */0, /* None */0, /* None */0, "opacity 0.3s ease-in-out"),
                                                              /* [] */0
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
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

var detailsCls = Css.style(/* :: */[
      Css.position(Css.relative),
      /* :: */[
        Css.zIndex(1),
        /* :: */[
          Css.padding2(Css.px(10), Css.px(15)),
          /* :: */[
            Css.color(Css.hex("444")),
            /* :: */[
              Css.background(Css.hex("fff")),
              /* :: */[
                Css.letterSpacing(Css.px(1)),
                /* :: */[
                  Css.color(Css.hex("828282")),
                  /* :: */[
                    Css.selector("&:before", /* :: */[
                          /* `declaration */[
                            -434952966,
                            /* tuple */[
                              "fontWeight",
                              "bold"
                            ]
                          ],
                          /* :: */[
                            Css.fontSize(Css.rem(1.1)),
                            /* :: */[
                              Css.paddingRight(Css.em(0.5)),
                              /* :: */[
                                Css.color(Css.hex("444")),
                                /* [] */0
                              ]
                            ]
                          ]
                        ]),
                    /* [] */0
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var component = ReasonReact.statelessComponent("GalleryItem");

function make($staropt$star, children) {
  var lightBG = $staropt$star ? $staropt$star[0] : true;
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
              return Curry._2(children, cls(lightBG), detailsCls);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  cls ,
  detailsCls ,
  component ,
  make ,
  
}
/* detailsCls Not a pure module */
