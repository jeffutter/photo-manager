type t;

external resize : t => bool => unit = "" [@@bs.send];

external pack : t => unit = "" [@@bs.send];

external update : t => unit = "" [@@bs.send];

external brick : Js.t 'a => t = "default" [@@bs.module "bricks.js"];
