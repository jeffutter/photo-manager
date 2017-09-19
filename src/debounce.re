type t;

external debounce :
  (unit => unit) [@bs] => waitMs::int? => options::Js.t 'options? => unit => t =
  "" [@@bs.module "lodash"];

external call: t => unit = "" [@@bs.send];

external cancel: t => unit = "" [@@bs.send]; 
