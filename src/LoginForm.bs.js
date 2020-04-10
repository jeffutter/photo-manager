// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "../node_modules/bs-css-emotion/src/Css.js";
import * as List from "../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Css_Core from "../node_modules/bs-css/src/Css_Core.js";

var baseLogoCls = Curry._1(Css.style, /* :: */[
      Css.position(Css.relative),
      /* :: */[
        Css.paddingRight(Css.px(8)),
        /* :: */[
          Css.selector("& path", /* :: */[
                Css_Core.SVG.fill(Css.hex("fff")),
                /* [] */0
              ]),
          /* :: */[
            Css.verticalAlign(Css.middle),
            /* [] */0
          ]
        ]
      ]
    ]);

var loginButtonBefore_000 = Css.unsafe("content", "''");

var loginButtonBefore_001 = /* :: */[
  Css.boxSizing(Css.borderBox),
  /* :: */[
    Css.position(Css.absolute),
    /* :: */[
      Css.top(Css.zero),
      /* :: */[
        Css.left(Css.zero),
        /* :: */[
          Css.width(Css.px(34)),
          /* :: */[
            Css.height(/* `percent */[
                  -119887163,
                  100.0
                ]),
            /* [] */0
          ]
        ]
      ]
    ]
  ]
];

var loginButtonBefore = /* :: */[
  loginButtonBefore_000,
  loginButtonBefore_001
];

var loginButtonFocus_000 = Css.outline(Css.px(0), /* none */-922086728, Css.black);

var loginButtonFocus = /* :: */[
  loginButtonFocus_000,
  /* [] */0
];

var loginButtonActive_000 = Css.boxShadow(Css_Core.Shadow.box(Css.zero, Css.zero, Css.zero, Css.px(32), true, Css.rgba(0, 0, 0, 0.1)));

var loginButtonActive = /* :: */[
  loginButtonActive_000,
  /* [] */0
];

var loginButton_000 = Css.boxSizing(Css.borderBox);

var loginButton_001 = /* :: */[
  Css.position(Css.relative),
  /* :: */[
    Css.margin(Css.em(0.2)),
    /* :: */[
      Css.padding2(Css.px(4), Css.px(8)),
      /* :: */[
        Css.border(Css.px(0), Css.none, Css.black),
        /* :: */[
          Css.textAlign(/* left */-944764921),
          /* :: */[
            Css.whiteSpace(/* nowrap */867913355),
            /* :: */[
              Css.borderRadius(Css.em(0.2)),
              /* :: */[
                Css.fontSize(Css.px(16)),
                /* :: */[
                  Css.color(Css.hex("FFF")),
                  /* :: */[
                    Css.display(Css.block),
                    /* :: */[
                      Css.selector("> span", /* :: */[
                            Css.unsafe("lineHeight", "28px"),
                            /* :: */[
                              Css.verticalAlign(Css.middle),
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
];

var loginButton = /* :: */[
  loginButton_000,
  loginButton_001
];

var facebookButtonBefore = List.concat(/* :: */[
      loginButtonBefore,
      /* :: */[
        /* :: */[
          Css.borderRight(Css.px(1), /* solid */12956715, Css.hex("364e92")),
          /* [] */0
        ],
        /* [] */0
      ]
    ]);

var googleButtonBefore = List.concat(/* :: */[
      loginButtonBefore,
      /* :: */[
        /* :: */[
          Css.borderRight(Css.px(1), /* solid */12956715, Css.hex("BB3F30")),
          /* [] */0
        ],
        /* [] */0
      ]
    ]);

var facebookButtonFocus = List.concat(/* :: */[
      loginButtonFocus,
      /* :: */[
        /* :: */[
          Css.backgroundColor(Css.hex("5B7BD5")),
          /* :: */[
            Css.backgroundImage(Css.linearGradient(Css.deg(180.0), /* :: */[
                      /* tuple */[
                        /* `percent */[
                          -119887163,
                          0.0
                        ],
                        Css.hex("5B7BD5")
                      ],
                      /* :: */[
                        /* tuple */[
                          /* `percent */[
                            -119887163,
                            100.0
                          ],
                          Css.hex("4864B1")
                        ],
                        /* [] */0
                      ]
                    ])),
            /* [] */0
          ]
        ],
        /* [] */0
      ]
    ]);

var googleButtonFocus = List.concat(/* :: */[
      loginButtonFocus,
      /* :: */[
        /* :: */[
          Css.backgroundColor(Css.hex("E74B37")),
          /* [] */0
        ],
        /* [] */0
      ]
    ]);

var loginButtonFacebookCls = Curry._1(Css.merge, /* :: */[
      Curry._1(Css.style, loginButton),
      /* :: */[
        Curry._1(Css.style, /* :: */[
              Css.backgroundColor(Css.hex("4C69BA")),
              /* :: */[
                Css.backgroundImage(Css.linearGradient(Css.deg(180.0), /* :: */[
                          /* tuple */[
                            /* `percent */[
                              -119887163,
                              0.0
                            ],
                            Css.hex("4C69BA")
                          ],
                          /* :: */[
                            /* tuple */[
                              /* `percent */[
                                -119887163,
                                100.0
                              ],
                              Css.hex("3B55A0")
                            ],
                            /* [] */0
                          ]
                        ])),
                /* :: */[
                  Css.textShadow(Css_Core.Shadow.text(Css.px(0), Css.px(-1), Css.zero, Css.hex("354C8C"))),
                  /* :: */[
                    Css.selector("&:active", loginButtonActive),
                    /* :: */[
                      Css.selector("&:before", facebookButtonBefore),
                      /* :: */[
                        Css.selector("&:hover, &:focus", facebookButtonFocus),
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]),
        /* [] */0
      ]
    ]);

var loginButtonGoogleCls = Curry._1(Css.merge, /* :: */[
      Curry._1(Css.style, loginButton),
      /* :: */[
        Curry._1(Css.style, /* :: */[
              Css.backgroundColor(Css.hex("DD4B39")),
              /* :: */[
                Css.textShadow(Css_Core.Shadow.text(Css.px(0), Css.px(-1), Css.zero, Css.hex("354C8C"))),
                /* :: */[
                  Css.selector("&:active", loginButtonActive),
                  /* :: */[
                    Css.selector("&:before", googleButtonBefore),
                    /* :: */[
                      Css.selector("&:hover, &:focus", googleButtonFocus),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]),
        /* [] */0
      ]
    ]);

var centerCls = Curry._1(Css.style, /* :: */[
      Css.margin(Css.auto),
      /* :: */[
        Css.position(Css.absolute),
        /* :: */[
          Css.top(Css.px(-80)),
          /* :: */[
            Css.left(Css.zero),
            /* :: */[
              Css.bottom(Css.zero),
              /* :: */[
                Css.right(Css.zero),
                /* :: */[
                  Css.height(Css.px(36)),
                  /* :: */[
                    Css.width(Css.px(200)),
                    /* :: */[
                      Css.selector("& a", /* :: */[
                            Css.textDecoration(Css.none),
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

var statusCls_000 = Css.margin2(Css.px(0), Css.px(10));

var statusCls_001 = /* :: */[
  Css.padding(Css.px(10)),
  /* :: */[
    Css.borderRadius(Css.px(3)),
    /* [] */0
  ]
];

var statusCls = /* :: */[
  statusCls_000,
  statusCls_001
];

var infoCls = Curry._1(Css.merge, /* :: */[
      Curry._1(Css.style, statusCls),
      /* :: */[
        Curry._1(Css.style, /* :: */[
              Css.color(Css.hex("059")),
              /* :: */[
                Css.backgroundColor(Css.hex("BEF")),
                /* [] */0
              ]
            ]),
        /* [] */0
      ]
    ]);

var successCls = Curry._1(Css.merge, /* :: */[
      Curry._1(Css.style, statusCls),
      /* :: */[
        Curry._1(Css.style, /* :: */[
              Css.color(Css.hex("270")),
              /* :: */[
                Css.backgroundColor(Css.hex("DFF2BF")),
                /* [] */0
              ]
            ]),
        /* [] */0
      ]
    ]);

var warningCls = Curry._1(Css.merge, /* :: */[
      Curry._1(Css.style, statusCls),
      /* :: */[
        Curry._1(Css.style, /* :: */[
              Css.color(Css.hex("9F6000")),
              /* :: */[
                Css.backgroundColor(Css.hex("FEEFB3")),
                /* [] */0
              ]
            ]),
        /* [] */0
      ]
    ]);

var errorCls = Curry._1(Css.merge, /* :: */[
      Curry._1(Css.style, statusCls),
      /* :: */[
        Curry._1(Css.style, /* :: */[
              Css.color(Css.hex("D8000C")),
              /* :: */[
                Css.backgroundColor(Css.hex("FFBABA")),
                /* [] */0
              ]
            ]),
        /* [] */0
      ]
    ]);

function loginWarning(param) {
  var match = localStorage.getItem("loginFlash");
  if (match !== null) {
    localStorage.removeItem("loginFlash");
    return React.createElement("div", {
                className: warningCls
              }, React.createElement("svg", {
                    height: "18",
                    width: "18",
                    viewBox: "0 0 1792 1792"
                  }, React.createElement("path", {
                        d: "M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
                      })), match);
  } else {
    return React.createElement("span", undefined);
  }
}

function LoginForm(Props) {
  return React.createElement("div", {
              className: centerCls
            }, loginWarning(/* () */0), React.createElement("div", undefined, React.createElement("a", {
                      className: loginButtonFacebookCls,
                      href: "/__auth/facebook"
                    }, React.createElement("svg", {
                          className: baseLogoCls,
                          height: "22",
                          width: "22",
                          viewBox: "0 0 1792 1792"
                        }, React.createElement("path", {
                              d: "M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"
                            })), React.createElement("span", undefined, "Login with Facebook"))), React.createElement("div", undefined, React.createElement("a", {
                      className: loginButtonGoogleCls,
                      href: "/__auth/google"
                    }, React.createElement("svg", {
                          className: baseLogoCls,
                          height: "22",
                          width: "22",
                          viewBox: "0 0 1792 1792"
                        }, React.createElement("path", {
                              d: "M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
                            })), React.createElement("span", undefined, "Login with Google"))));
}

var facebookCls = baseLogoCls;

var googleCls = baseLogoCls;

var make = LoginForm;

export {
  baseLogoCls ,
  facebookCls ,
  googleCls ,
  loginButtonBefore ,
  loginButtonFocus ,
  loginButtonActive ,
  loginButton ,
  facebookButtonBefore ,
  googleButtonBefore ,
  facebookButtonFocus ,
  googleButtonFocus ,
  loginButtonFacebookCls ,
  loginButtonGoogleCls ,
  centerCls ,
  statusCls ,
  infoCls ,
  successCls ,
  warningCls ,
  errorCls ,
  loginWarning ,
  make ,
  
}
/* baseLogoCls Not a pure module */
