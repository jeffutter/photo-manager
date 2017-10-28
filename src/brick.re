type t;

[@bs.send] external resize : (t, bool) => unit = "";

[@bs.send] external pack : t => unit = "";

[@bs.send] external update : t => unit = "";

[@bs.module "bricks.js"] external brick : Js.t('a) => t = "default";
