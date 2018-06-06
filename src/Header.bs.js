// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css/src/Css.js";
import * as Block from "../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../node_modules/reason-react/src/ReasonReact.js";
import * as Cookies$PhotoManager from "./Cookies.bs.js";
import * as NavLink$PhotoManager from "./NavLink.bs.js";

var setLocationHref = (
    function (val) {
      window.location.href = val
    }
  );

var headerCls = Css.style(/* :: */[
      Css.position(Css.fixed),
      /* :: */[
        Css.top(Css.zero),
        /* :: */[
          Css.left(Css.zero),
          /* :: */[
            Css.minHeight(Css.px(62)),
            /* :: */[
              Css.maxHeight(Css.px(62)),
              /* :: */[
                Css.zIndex(999),
                /* :: */[
                  Css.width(/* `percent */[
                        -119887163,
                        100.0
                      ]),
                  /* :: */[
                    Css.overflow(Css.hidden),
                    /* :: */[
                      Css.transition(/* Some */[300], /* None */0, /* None */0, "all"),
                      /* :: */[
                        Css.fontFamily("\"Montserrat\", sans-serif"),
                        /* :: */[
                          Css.backgroundColor(Css.rgba(255, 255, 255, 0.95)),
                          /* :: */[
                            Css.borderBottom(Css.px(1), Css.solid, Css.gainsboro),
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
    ]);

var mobileToggleCls = Css.style(/* :: */[
      Css.display(Css.none),
      /* :: */[
        Css.cursor(/* pointer */-786317123),
        /* :: */[
          Css.fontSize(Css.px(20)),
          /* :: */[
            Css.position(Css.absolute),
            /* :: */[
              Css.right(Css.px(22)),
              /* :: */[
                Css.top(Css.zero),
                /* :: */[
                  Css.width(Css.px(30)),
                  /* :: */[
                    Css.transform(Css.rotate(Css.deg(0))),
                    /* :: */[
                      Css.transition(/* Some */[500], /* None */0, /* Some */[Css.easeInOut], "all"),
                      /* :: */[
                        Css.zIndex(1000),
                        /* :: */[
                          Css.selector("& span", /* :: */[
                                Css.width(Css.px(30)),
                                /* :: */[
                                  Css.height(Css.px(4)),
                                  /* :: */[
                                    Css.marginBottom(Css.px(6)),
                                    /* :: */[
                                      Css.borderRadius(Css.px(1000)),
                                      /* :: */[
                                        Css.background(Css.hex("8f8f8f")),
                                        /* :: */[
                                          Css.display(Css.block),
                                          /* [] */0
                                        ]
                                      ]
                                    ]
                                  ]
                                ]
                              ]),
                          /* :: */[
                            Css.selector("@media only screen and (max-width: 766px)", /* :: */[
                                  Css.display(Css.block),
                                  /* :: */[
                                    Css.top(Css.px(18)),
                                    /* [] */0
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
    ]);

var openNavCls = Css.style(/* :: */[
      Css.important(Css.maxHeight(Css.px(440))),
      /* :: */[
        Css.selector(".mobileToggle", /* :: */[
              Css.transform(Css.rotate(Css.deg(-90))),
              /* [] */0
            ]),
        /* [] */0
      ]
    ]);

var logoCls = Css.style(/* :: */[
      Css.fontSize(Css.px(25)),
      /* :: */[
        Css.color(Css.hex("8f8f8f")),
        /* :: */[
          Css.textTransform(Css.uppercase),
          /* :: */[
            Css.display(Css.inlineBlock),
            /* :: */[
              Css.margin4(Css.px(18), Css.zero, Css.px(18), Css.px(10)),
              /* :: */[
                Css.lineHeight(1.0),
                /* :: */[
                  Css.textDecoration(Css.none),
                  /* :: */[
                    Css.width(Css.auto),
                    /* :: */[
                      Css.selector("@media only screen and (max-width: 766px)", /* :: */[
                            Css.$$float(Css.none),
                            /* [] */0
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
    ]);

var navCls = Css.style(/* :: */[
      Css.$$float(/* right */-379319332),
      /* :: */[
        Css.width(/* `percent */[
              -119887163,
              60.0
            ]),
        /* :: */[
          Css.height(/* `percent */[
                -119887163,
                100.0
              ]),
          /* :: */[
            Css.marginRight(Css.px(10)),
            /* :: */[
              Css.selector("@media only screen and (max-width: 766px)", /* :: */[
                    Css.width(/* `percent */[
                          -119887163,
                          100.0
                        ]),
                    /* :: */[
                      Css.margin(Css.zero),
                      /* [] */0
                    ]
                  ]),
              /* :: */[
                Css.selector("& ul", /* :: */[
                      Css.height(/* `percent */[
                            -119887163,
                            100.0
                          ]),
                      /* :: */[
                        Css.listStyle(/* disc */-1033279659, /* inside */501235708, /* none */-922086728),
                        /* :: */[
                          Css.overflow(Css.hidden),
                          /* :: */[
                            Css.textAlign(/* right */-379319332),
                            /* :: */[
                              Css.$$float(/* right */-379319332),
                              /* :: */[
                                Css.padding(Css.zero),
                                /* :: */[
                                  Css.margin(Css.zero),
                                  /* :: */[
                                    Css.selector("@media only screen and (max-width: 766px)", /* :: */[
                                          Css.paddingTop(Css.px(10)),
                                          /* :: */[
                                            Css.marginBottom(Css.px(22)),
                                            /* :: */[
                                              Css.$$float(/* left */-944764921),
                                              /* :: */[
                                                Css.textAlign(Css.center),
                                                /* :: */[
                                                  Css.width(/* `percent */[
                                                        -119887163,
                                                        100.0
                                                      ]),
                                                  /* [] */0
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]),
                                    /* :: */[
                                      Css.selector("& li", /* :: */[
                                            Css.height(/* `percent */[
                                                  -119887163,
                                                  100.0
                                                ]),
                                            /* :: */[
                                              Css.display(Css.inlineBlock),
                                              /* :: */[
                                                Css.position(Css.relative),
                                                /* :: */[
                                                  Css.marginLeft(Css.px(35)),
                                                  /* :: */[
                                                    Css.lineHeight(1.5),
                                                    /* :: */[
                                                      Css.selector("@media only screen and (max-width: 766px)", /* :: */[
                                                            Css.width(/* `percent */[
                                                                  -119887163,
                                                                  100.0
                                                                ]),
                                                            /* :: */[
                                                              Css.padding2(Css.zero, Css.px(7)),
                                                              /* :: */[
                                                                Css.margin(Css.zero),
                                                                /* [] */0
                                                              ]
                                                            ]
                                                          ]),
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]),
                                      /* :: */[
                                        Css.selector("& a", /* :: */[
                                              Css.display(Css.block),
                                              /* :: */[
                                                Css.verticalAlign(Css.middle),
                                                /* :: */[
                                                  Css.color(Css.hex("888888")),
                                                  /* :: */[
                                                    Css.textTransform(Css.uppercase),
                                                    /* :: */[
                                                      Css.fontSize(Css.px(16)),
                                                      /* :: */[
                                                        Css.textDecoration(Css.none),
                                                        /* :: */[
                                                          Css.padding(Css.px(20)),
                                                          /* :: */[
                                                            Css.selector("&:hover, &:active", /* :: */[
                                                                  Css.color(Css.hex("fff")),
                                                                  /* :: */[
                                                                    Css.background(Css.rgba(0, 0, 0, 0.2)),
                                                                    /* [] */0
                                                                  ]
                                                                ]),
                                                            /* :: */[
                                                              Css.selector("&.active", /* :: */[
                                                                    Css.color(Css.hex("fff")),
                                                                    /* :: */[
                                                                      Css.background(Css.rgba(0, 0, 0, 0.3)),
                                                                      /* [] */0
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
                    ]),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

var activeCls = Css.style(/* [] */0);

var openNavMobileToggle = Css.style(/* :: */[
      Css.transform(Css.rotate(Css.deg(90))),
      /* [] */0
    ]);

var component = ReasonReact.reducerComponent("Header");

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
          /* render */(function (self) {
              var headerClasses = /* array */[headerCls];
              var mobileToggleClasses = /* array */[mobileToggleCls];
              if (self[/* state */1][/* _open */0]) {
                headerClasses.push(openNavCls);
                mobileToggleClasses.push(openNavMobileToggle);
              }
              return React.createElement("header", {
                          className: headerClasses.join(" ")
                        }, React.createElement("a", {
                              className: logoCls,
                              href: "#"
                            }, "Photo Gallery"), React.createElement("div", {
                              className: mobileToggleClasses.join(" "),
                              onClick: (function () {
                                  return Curry._1(self[/* send */3], /* ToggleNav */0);
                                })
                            }, React.createElement("span", undefined), React.createElement("span", undefined), React.createElement("span", undefined)), React.createElement("nav", {
                              className: navCls
                            }, React.createElement("ul", undefined, React.createElement("li", undefined, ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make("/", /* Some */[activeCls], /* Some */[(function () {
                                                  return Curry._1(self[/* send */3], /* ToggleNav */0);
                                                })], /* array */["Home"]))), React.createElement("li", undefined, ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make("/gallery", /* Some */[activeCls], /* Some */[(function () {
                                                  return Curry._1(self[/* send */3], /* ToggleNav */0);
                                                })], /* array */["Gallery"]))), React.createElement("li", undefined, ReasonReact.element(/* None */0, /* None */0, NavLink$PhotoManager.make("/", /* Some */[activeCls], /* Some */[(function () {
                                                  return Curry._1(self[/* send */3], /* LogOut */1);
                                                })], /* array */["Logout"]))))));
            }),
          /* initialState */(function () {
              return /* record */[/* _open */false];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (action) {
                Cookies$PhotoManager.logOut(/* None */0, /* () */0);
                Curry._1(setLocationHref, "/");
                return /* NoUpdate */0;
              } else {
                return /* Update */Block.__(0, [/* record */[/* _open */!state[/* _open */0]]]);
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  setLocationHref ,
  headerCls ,
  mobileToggleCls ,
  openNavCls ,
  logoCls ,
  navCls ,
  activeCls ,
  openNavMobileToggle ,
  component ,
  make ,
  
}
/* setLocationHref Not a pure module */
