type a;

let debounce1 = (~fn: 'a => unit, ~timeOut=1000): ('a => unit) => {
  let id = ref(Js.Nullable.null);

  (a: 'a) => {
    (id^)
    ->Js.Nullable.toOption
    ->Belt.Option.mapWithDefault((), Js.Global.clearTimeout);

    id := Js.Nullable.return(Js.Global.setTimeout(() => fn(a), timeOut));
    ();
  };
};