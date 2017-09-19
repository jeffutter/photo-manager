external debounce :
  ('a => 'b) [@bs.uncurry] => waitMs::int? => options::Js.t 'options? => ('a => 'b) [@bs] =
  "" [@@bs.module "lodash"];

let debounce ::waitMs=? ::options=? f a => {
  let f = debounce f ::?waitMs ::?options;
  f a [@bs]
};
