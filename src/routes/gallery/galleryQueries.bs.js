// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as Curry from "../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Js_json from "../../../node_modules/bs-platform/lib/es6/js_json.js";
import * as Caml_exceptions from "../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";

var Graphql_error = Caml_exceptions.create("GalleryQueries-PhotoManager.GalleryQuery.Graphql_error");

var query = "query gallery($slug: String!)  {\ngallery(slug: $slug)  {\nid  \nname  \npath  \nslug  \ntotalDescendants  \ndescendants  {\n__typename\n...on Gallery   {\nid  \nname  \npath  \nslug  \n}\n...on Image   {\nid  \nname  \npath  \nslug  \nsize  \nwidth  \nheight  \nrating  \nsmallUrl  \nmediumUrl  \nlargeUrl  \n}\n}\n}\n}";

function parse(value) {
  var match = Js_json.decodeObject(value);
  if (match) {
    var value$1 = match[0]["gallery"];
    var match$1 = Js_json.decodeNull(value$1);
    var tmp;
    if (match$1) {
      tmp = /* None */0;
    } else {
      var match$2 = Js_json.decodeObject(value$1);
      var tmp$1;
      if (match$2) {
        var value$2 = match$2[0];
        var value$3 = value$2["id"];
        var match$3 = Js_json.decodeString(value$3);
        var tmp$2;
        if (match$3) {
          tmp$2 = match$3[0];
        } else {
          throw Graphql_error;
        }
        var value$4 = value$2["name"];
        var match$4 = Js_json.decodeString(value$4);
        var tmp$3;
        if (match$4) {
          tmp$3 = match$4[0];
        } else {
          throw Graphql_error;
        }
        var value$5 = value$2["path"];
        var match$5 = Js_json.decodeArray(value$5);
        var tmp$4;
        if (match$5) {
          tmp$4 = match$5[0].map((function (value) {
                  var match = Js_json.decodeString(value);
                  if (match) {
                    return match[0];
                  } else {
                    throw Graphql_error;
                  }
                }));
        } else {
          throw Graphql_error;
        }
        var value$6 = value$2["slug"];
        var match$6 = Js_json.decodeString(value$6);
        var tmp$5;
        if (match$6) {
          tmp$5 = match$6[0];
        } else {
          throw Graphql_error;
        }
        var value$7 = value$2["totalDescendants"];
        var match$7 = Js_json.decodeNull(value$7);
        var tmp$6;
        if (match$7) {
          tmp$6 = /* None */0;
        } else {
          var match$8 = Js_json.decodeNumber(value$7);
          var tmp$7;
          if (match$8) {
            tmp$7 = match$8[0] | 0;
          } else {
            throw Graphql_error;
          }
          tmp$6 = /* Some */[tmp$7];
        }
        var value$8 = value$2["descendants"];
        var match$9 = Js_json.decodeNull(value$8);
        var tmp$8;
        if (match$9) {
          tmp$8 = /* None */0;
        } else {
          var match$10 = Js_json.decodeArray(value$8);
          var tmp$9;
          if (match$10) {
            tmp$9 = match$10[0].map((function (value) {
                    var match = Js_json.decodeObject(value);
                    if (match) {
                      var match$1 = Js_json.decodeString(match[0]["__typename"]);
                      if (match$1) {
                        switch (match$1[0]) {
                          case "Gallery" : 
                              var match$2 = Js_json.decodeObject(value);
                              var tmp;
                              if (match$2) {
                                var value$1 = match$2[0];
                                var value$2 = value$1["id"];
                                var match$3 = Js_json.decodeString(value$2);
                                var tmp$1;
                                if (match$3) {
                                  tmp$1 = match$3[0];
                                } else {
                                  throw Graphql_error;
                                }
                                var value$3 = value$1["name"];
                                var match$4 = Js_json.decodeString(value$3);
                                var tmp$2;
                                if (match$4) {
                                  tmp$2 = match$4[0];
                                } else {
                                  throw Graphql_error;
                                }
                                var value$4 = value$1["path"];
                                var match$5 = Js_json.decodeArray(value$4);
                                var tmp$3;
                                if (match$5) {
                                  tmp$3 = match$5[0].map((function (value) {
                                          var match = Js_json.decodeString(value);
                                          if (match) {
                                            return match[0];
                                          } else {
                                            throw Graphql_error;
                                          }
                                        }));
                                } else {
                                  throw Graphql_error;
                                }
                                var value$5 = value$1["slug"];
                                var match$6 = Js_json.decodeString(value$5);
                                var tmp$4;
                                if (match$6) {
                                  tmp$4 = match$6[0];
                                } else {
                                  throw Graphql_error;
                                }
                                tmp = {
                                  id: tmp$1,
                                  name: tmp$2,
                                  path: tmp$3,
                                  slug: tmp$4
                                };
                              } else {
                                throw Graphql_error;
                              }
                              return /* `Gallery */[
                                      -938956686,
                                      tmp
                                    ];
                          case "Image" : 
                              var match$7 = Js_json.decodeObject(value);
                              var tmp$5;
                              if (match$7) {
                                var value$6 = match$7[0];
                                var value$7 = value$6["id"];
                                var match$8 = Js_json.decodeString(value$7);
                                var tmp$6;
                                if (match$8) {
                                  tmp$6 = match$8[0];
                                } else {
                                  throw Graphql_error;
                                }
                                var value$8 = value$6["name"];
                                var match$9 = Js_json.decodeString(value$8);
                                var tmp$7;
                                if (match$9) {
                                  tmp$7 = match$9[0];
                                } else {
                                  throw Graphql_error;
                                }
                                var value$9 = value$6["path"];
                                var match$10 = Js_json.decodeArray(value$9);
                                var tmp$8;
                                if (match$10) {
                                  tmp$8 = match$10[0].map((function (value) {
                                          var match = Js_json.decodeString(value);
                                          if (match) {
                                            return match[0];
                                          } else {
                                            throw Graphql_error;
                                          }
                                        }));
                                } else {
                                  throw Graphql_error;
                                }
                                var value$10 = value$6["slug"];
                                var match$11 = Js_json.decodeString(value$10);
                                var tmp$9;
                                if (match$11) {
                                  tmp$9 = match$11[0];
                                } else {
                                  throw Graphql_error;
                                }
                                var value$11 = value$6["size"];
                                var match$12 = Js_json.decodeNull(value$11);
                                var tmp$10;
                                if (match$12) {
                                  tmp$10 = /* None */0;
                                } else {
                                  var match$13 = Js_json.decodeString(value$11);
                                  var tmp$11;
                                  if (match$13) {
                                    tmp$11 = match$13[0];
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$10 = /* Some */[tmp$11];
                                }
                                var value$12 = value$6["width"];
                                var match$14 = Js_json.decodeNull(value$12);
                                var tmp$12;
                                if (match$14) {
                                  tmp$12 = /* None */0;
                                } else {
                                  var match$15 = Js_json.decodeNumber(value$12);
                                  var tmp$13;
                                  if (match$15) {
                                    tmp$13 = match$15[0] | 0;
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$12 = /* Some */[tmp$13];
                                }
                                var value$13 = value$6["height"];
                                var match$16 = Js_json.decodeNull(value$13);
                                var tmp$14;
                                if (match$16) {
                                  tmp$14 = /* None */0;
                                } else {
                                  var match$17 = Js_json.decodeNumber(value$13);
                                  var tmp$15;
                                  if (match$17) {
                                    tmp$15 = match$17[0] | 0;
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$14 = /* Some */[tmp$15];
                                }
                                var value$14 = value$6["rating"];
                                var match$18 = Js_json.decodeNull(value$14);
                                var tmp$16;
                                if (match$18) {
                                  tmp$16 = /* None */0;
                                } else {
                                  var match$19 = Js_json.decodeNumber(value$14);
                                  var tmp$17;
                                  if (match$19) {
                                    tmp$17 = match$19[0] | 0;
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$16 = /* Some */[tmp$17];
                                }
                                var value$15 = value$6["smallUrl"];
                                var match$20 = Js_json.decodeNull(value$15);
                                var tmp$18;
                                if (match$20) {
                                  tmp$18 = /* None */0;
                                } else {
                                  var match$21 = Js_json.decodeString(value$15);
                                  var tmp$19;
                                  if (match$21) {
                                    tmp$19 = match$21[0];
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$18 = /* Some */[tmp$19];
                                }
                                var value$16 = value$6["mediumUrl"];
                                var match$22 = Js_json.decodeNull(value$16);
                                var tmp$20;
                                if (match$22) {
                                  tmp$20 = /* None */0;
                                } else {
                                  var match$23 = Js_json.decodeString(value$16);
                                  var tmp$21;
                                  if (match$23) {
                                    tmp$21 = match$23[0];
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$20 = /* Some */[tmp$21];
                                }
                                var value$17 = value$6["largeUrl"];
                                var match$24 = Js_json.decodeNull(value$17);
                                var tmp$22;
                                if (match$24) {
                                  tmp$22 = /* None */0;
                                } else {
                                  var match$25 = Js_json.decodeString(value$17);
                                  var tmp$23;
                                  if (match$25) {
                                    tmp$23 = match$25[0];
                                  } else {
                                    throw Graphql_error;
                                  }
                                  tmp$22 = /* Some */[tmp$23];
                                }
                                tmp$5 = {
                                  id: tmp$6,
                                  name: tmp$7,
                                  path: tmp$8,
                                  slug: tmp$9,
                                  size: tmp$10,
                                  width: tmp$12,
                                  height: tmp$14,
                                  rating: tmp$16,
                                  smallUrl: tmp$18,
                                  mediumUrl: tmp$20,
                                  largeUrl: tmp$22
                                };
                              } else {
                                throw Graphql_error;
                              }
                              return /* `Image */[
                                      -795439301,
                                      tmp$5
                                    ];
                          default:
                            throw Graphql_error;
                        }
                      } else {
                        throw Graphql_error;
                      }
                    } else {
                      throw Graphql_error;
                    }
                  }));
          } else {
            throw Graphql_error;
          }
          tmp$8 = /* Some */[tmp$9];
        }
        tmp$1 = {
          id: tmp$2,
          name: tmp$3,
          path: tmp$4,
          slug: tmp$5,
          totalDescendants: tmp$6,
          descendants: tmp$8
        };
      } else {
        throw Graphql_error;
      }
      tmp = /* Some */[tmp$1];
    }
    return {
            gallery: tmp
          };
  } else {
    throw Graphql_error;
  }
}

function json_of_optional(encoder, value) {
  if (value) {
    return Curry._1(encoder, value[0]);
  } else {
    return null;
  }
}

function json_of_array(encoder, value) {
  return value.map(Curry.__1(encoder));
}

function json_of_String(value) {
  return value;
}

function make(slug, _) {
  return {
          query: query,
          variables: Js_dict.fromList(/* :: */[
                /* tuple */[
                  "slug",
                  slug
                ],
                /* [] */0
              ]),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var slug = variables.slug;
  return {
          query: query,
          variables: Js_dict.fromList(/* :: */[
                /* tuple */[
                  "slug",
                  slug
                ],
                /* [] */0
              ]),
          parse: parse
        };
}

function ret_type() {
  return /* module */[];
}

var MT_Ret = /* module */[];

var GalleryQuery = /* module */[
  /* Graphql_error */Graphql_error,
  /* query */query,
  /* parse */parse,
  /* json_of_optional */json_of_optional,
  /* json_of_array */json_of_array,
  /* json_of_String */json_of_String,
  /* make */make,
  /* makeWithVariables */makeWithVariables,
  /* ret_type */ret_type,
  /* MT_Ret */MT_Ret
];

var Graphql_error$1 = Caml_exceptions.create("GalleryQueries-PhotoManager.MoreQuery.Graphql_error");

var query$1 = "query gallery($slug: String!, $slugs: [String!]!)  {\ngallery(slug: $slug)  {\nid  \nname  \npath  \nslug  \ndescendants(slugs: $slugs)  {\n__typename\n...on Gallery   {\nid  \nname  \npath  \nslug  \n}\n...on Image   {\nid  \nname  \npath  \nslug  \nthumbnail  \n}\n}\n}\n}";

function parse$1(value) {
  var match = Js_json.decodeObject(value);
  if (match) {
    var value$1 = match[0]["gallery"];
    var match$1 = Js_json.decodeNull(value$1);
    var tmp;
    if (match$1) {
      tmp = /* None */0;
    } else {
      var match$2 = Js_json.decodeObject(value$1);
      var tmp$1;
      if (match$2) {
        var value$2 = match$2[0];
        var value$3 = value$2["id"];
        var match$3 = Js_json.decodeString(value$3);
        var tmp$2;
        if (match$3) {
          tmp$2 = match$3[0];
        } else {
          throw Graphql_error$1;
        }
        var value$4 = value$2["name"];
        var match$4 = Js_json.decodeString(value$4);
        var tmp$3;
        if (match$4) {
          tmp$3 = match$4[0];
        } else {
          throw Graphql_error$1;
        }
        var value$5 = value$2["path"];
        var match$5 = Js_json.decodeArray(value$5);
        var tmp$4;
        if (match$5) {
          tmp$4 = match$5[0].map((function (value) {
                  var match = Js_json.decodeString(value);
                  if (match) {
                    return match[0];
                  } else {
                    throw Graphql_error$1;
                  }
                }));
        } else {
          throw Graphql_error$1;
        }
        var value$6 = value$2["slug"];
        var match$6 = Js_json.decodeString(value$6);
        var tmp$5;
        if (match$6) {
          tmp$5 = match$6[0];
        } else {
          throw Graphql_error$1;
        }
        var value$7 = value$2["descendants"];
        var match$7 = Js_json.decodeNull(value$7);
        var tmp$6;
        if (match$7) {
          tmp$6 = /* None */0;
        } else {
          var match$8 = Js_json.decodeArray(value$7);
          var tmp$7;
          if (match$8) {
            tmp$7 = match$8[0].map((function (value) {
                    var match = Js_json.decodeObject(value);
                    if (match) {
                      var match$1 = Js_json.decodeString(match[0]["__typename"]);
                      if (match$1) {
                        switch (match$1[0]) {
                          case "Gallery" : 
                              var match$2 = Js_json.decodeObject(value);
                              var tmp;
                              if (match$2) {
                                var value$1 = match$2[0];
                                var value$2 = value$1["id"];
                                var match$3 = Js_json.decodeString(value$2);
                                var tmp$1;
                                if (match$3) {
                                  tmp$1 = match$3[0];
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$3 = value$1["name"];
                                var match$4 = Js_json.decodeString(value$3);
                                var tmp$2;
                                if (match$4) {
                                  tmp$2 = match$4[0];
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$4 = value$1["path"];
                                var match$5 = Js_json.decodeArray(value$4);
                                var tmp$3;
                                if (match$5) {
                                  tmp$3 = match$5[0].map((function (value) {
                                          var match = Js_json.decodeString(value);
                                          if (match) {
                                            return match[0];
                                          } else {
                                            throw Graphql_error$1;
                                          }
                                        }));
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$5 = value$1["slug"];
                                var match$6 = Js_json.decodeString(value$5);
                                var tmp$4;
                                if (match$6) {
                                  tmp$4 = match$6[0];
                                } else {
                                  throw Graphql_error$1;
                                }
                                tmp = {
                                  id: tmp$1,
                                  name: tmp$2,
                                  path: tmp$3,
                                  slug: tmp$4
                                };
                              } else {
                                throw Graphql_error$1;
                              }
                              return /* `Gallery */[
                                      -938956686,
                                      tmp
                                    ];
                          case "Image" : 
                              var match$7 = Js_json.decodeObject(value);
                              var tmp$5;
                              if (match$7) {
                                var value$6 = match$7[0];
                                var value$7 = value$6["id"];
                                var match$8 = Js_json.decodeString(value$7);
                                var tmp$6;
                                if (match$8) {
                                  tmp$6 = match$8[0];
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$8 = value$6["name"];
                                var match$9 = Js_json.decodeString(value$8);
                                var tmp$7;
                                if (match$9) {
                                  tmp$7 = match$9[0];
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$9 = value$6["path"];
                                var match$10 = Js_json.decodeArray(value$9);
                                var tmp$8;
                                if (match$10) {
                                  tmp$8 = match$10[0].map((function (value) {
                                          var match = Js_json.decodeString(value);
                                          if (match) {
                                            return match[0];
                                          } else {
                                            throw Graphql_error$1;
                                          }
                                        }));
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$10 = value$6["slug"];
                                var match$11 = Js_json.decodeString(value$10);
                                var tmp$9;
                                if (match$11) {
                                  tmp$9 = match$11[0];
                                } else {
                                  throw Graphql_error$1;
                                }
                                var value$11 = value$6["thumbnail"];
                                var match$12 = Js_json.decodeNull(value$11);
                                var tmp$10;
                                if (match$12) {
                                  tmp$10 = /* None */0;
                                } else {
                                  var match$13 = Js_json.decodeString(value$11);
                                  var tmp$11;
                                  if (match$13) {
                                    tmp$11 = match$13[0];
                                  } else {
                                    throw Graphql_error$1;
                                  }
                                  tmp$10 = /* Some */[tmp$11];
                                }
                                tmp$5 = {
                                  id: tmp$6,
                                  name: tmp$7,
                                  path: tmp$8,
                                  slug: tmp$9,
                                  thumbnail: tmp$10
                                };
                              } else {
                                throw Graphql_error$1;
                              }
                              return /* `Image */[
                                      -795439301,
                                      tmp$5
                                    ];
                          default:
                            throw Graphql_error$1;
                        }
                      } else {
                        throw Graphql_error$1;
                      }
                    } else {
                      throw Graphql_error$1;
                    }
                  }));
          } else {
            throw Graphql_error$1;
          }
          tmp$6 = /* Some */[tmp$7];
        }
        tmp$1 = {
          id: tmp$2,
          name: tmp$3,
          path: tmp$4,
          slug: tmp$5,
          descendants: tmp$6
        };
      } else {
        throw Graphql_error$1;
      }
      tmp = /* Some */[tmp$1];
    }
    return {
            gallery: tmp
          };
  } else {
    throw Graphql_error$1;
  }
}

function json_of_optional$1(encoder, value) {
  if (value) {
    return Curry._1(encoder, value[0]);
  } else {
    return null;
  }
}

function json_of_array$1(encoder, value) {
  return value.map(Curry.__1(encoder));
}

function json_of_String$1(value) {
  return value;
}

function make$1(slug, slugs, _) {
  return {
          query: query$1,
          variables: Js_dict.fromList(/* :: */[
                /* tuple */[
                  "slug",
                  slug
                ],
                /* :: */[
                  /* tuple */[
                    "slugs",
                    slugs.map(json_of_String$1)
                  ],
                  /* [] */0
                ]
              ]),
          parse: parse$1
        };
}

function makeWithVariables$1(variables) {
  var slug = variables.slug;
  var slugs = variables.slugs;
  return {
          query: query$1,
          variables: Js_dict.fromList(/* :: */[
                /* tuple */[
                  "slug",
                  slug
                ],
                /* :: */[
                  /* tuple */[
                    "slugs",
                    slugs.map(json_of_String$1)
                  ],
                  /* [] */0
                ]
              ]),
          parse: parse$1
        };
}

function ret_type$1() {
  return /* module */[];
}

var MT_Ret$1 = /* module */[];

var MoreQuery = /* module */[
  /* Graphql_error */Graphql_error$1,
  /* query */query$1,
  /* parse */parse$1,
  /* json_of_optional */json_of_optional$1,
  /* json_of_array */json_of_array$1,
  /* json_of_String */json_of_String$1,
  /* make */make$1,
  /* makeWithVariables */makeWithVariables$1,
  /* ret_type */ret_type$1,
  /* MT_Ret */MT_Ret$1
];

var Graphql_error$2 = Caml_exceptions.create("GalleryQueries-PhotoManager.RateImage.Graphql_error");

var query$2 = "mutation rateImage($slug: String!, $rating: Int!)  {\nrateImage(slug: $slug, rating: $rating)  {\nid  \nname  \npath  \nslug  \nrating  \n}\n}";

function parse$2(value) {
  var match = Js_json.decodeObject(value);
  if (match) {
    var value$1 = match[0]["rateImage"];
    var match$1 = Js_json.decodeNull(value$1);
    var tmp;
    if (match$1) {
      tmp = /* None */0;
    } else {
      var match$2 = Js_json.decodeObject(value$1);
      var tmp$1;
      if (match$2) {
        var value$2 = match$2[0];
        var value$3 = value$2["id"];
        var match$3 = Js_json.decodeString(value$3);
        var tmp$2;
        if (match$3) {
          tmp$2 = match$3[0];
        } else {
          throw Graphql_error$2;
        }
        var value$4 = value$2["name"];
        var match$4 = Js_json.decodeString(value$4);
        var tmp$3;
        if (match$4) {
          tmp$3 = match$4[0];
        } else {
          throw Graphql_error$2;
        }
        var value$5 = value$2["path"];
        var match$5 = Js_json.decodeArray(value$5);
        var tmp$4;
        if (match$5) {
          tmp$4 = match$5[0].map((function (value) {
                  var match = Js_json.decodeString(value);
                  if (match) {
                    return match[0];
                  } else {
                    throw Graphql_error$2;
                  }
                }));
        } else {
          throw Graphql_error$2;
        }
        var value$6 = value$2["slug"];
        var match$6 = Js_json.decodeString(value$6);
        var tmp$5;
        if (match$6) {
          tmp$5 = match$6[0];
        } else {
          throw Graphql_error$2;
        }
        var value$7 = value$2["rating"];
        var match$7 = Js_json.decodeNull(value$7);
        var tmp$6;
        if (match$7) {
          tmp$6 = /* None */0;
        } else {
          var match$8 = Js_json.decodeNumber(value$7);
          var tmp$7;
          if (match$8) {
            tmp$7 = match$8[0] | 0;
          } else {
            throw Graphql_error$2;
          }
          tmp$6 = /* Some */[tmp$7];
        }
        tmp$1 = {
          id: tmp$2,
          name: tmp$3,
          path: tmp$4,
          slug: tmp$5,
          rating: tmp$6
        };
      } else {
        throw Graphql_error$2;
      }
      tmp = /* Some */[tmp$1];
    }
    return {
            rateImage: tmp
          };
  } else {
    throw Graphql_error$2;
  }
}

function json_of_optional$2(encoder, value) {
  if (value) {
    return Curry._1(encoder, value[0]);
  } else {
    return null;
  }
}

function json_of_array$2(encoder, value) {
  return value.map(Curry.__1(encoder));
}

function json_of_String$2(value) {
  return value;
}

function json_of_Int(value) {
  return value;
}

function make$2(slug, rating, _) {
  return {
          query: query$2,
          variables: Js_dict.fromList(/* :: */[
                /* tuple */[
                  "slug",
                  slug
                ],
                /* :: */[
                  /* tuple */[
                    "rating",
                    rating
                  ],
                  /* [] */0
                ]
              ]),
          parse: parse$2
        };
}

function makeWithVariables$2(variables) {
  var slug = variables.slug;
  var rating = variables.rating;
  return {
          query: query$2,
          variables: Js_dict.fromList(/* :: */[
                /* tuple */[
                  "slug",
                  slug
                ],
                /* :: */[
                  /* tuple */[
                    "rating",
                    rating
                  ],
                  /* [] */0
                ]
              ]),
          parse: parse$2
        };
}

function ret_type$2() {
  return /* module */[];
}

var MT_Ret$2 = /* module */[];

var RateImage = /* module */[
  /* Graphql_error */Graphql_error$2,
  /* query */query$2,
  /* parse */parse$2,
  /* json_of_optional */json_of_optional$2,
  /* json_of_array */json_of_array$2,
  /* json_of_String */json_of_String$2,
  /* json_of_Int */json_of_Int,
  /* make */make$2,
  /* makeWithVariables */makeWithVariables$2,
  /* ret_type */ret_type$2,
  /* MT_Ret */MT_Ret$2
];

export {
  GalleryQuery ,
  MoreQuery ,
  RateImage ,
  
}
/* Js_dict Not a pure module */
