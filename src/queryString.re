/*
 * Define a type that can be either a single string or a list of strings
 */
type queryResult =
  | Single(string)
  | Multiple(list(string))
  | None;

type queryItem =
  | Single(string)
  | Multiple(list(string));

/*
 * Make a string “safe” by
 * 1) Changing all + to a space (decodeURI doesn’t do that)
 * 2) URI decoding (change things like %3f to ?)
 * 3) Changing <, >, and & to &lt; &gt; and &amp;
 */
let makeSafe = (s: string) : string =>
  Js.Global.decodeURI(Js.String.replaceByRe([%re "/\\+/g"], " ", s))
  |> Js.String.replaceByRe([%re "/&/g"], "&amp;")
  |> Js.String.replaceByRe([%re "/</g"], "&lt;")
  |> Js.String.replaceByRe([%re "/>/g"], "&gt;");

/*
 * This is the function used by fold_left in parseQueryString.
 * Split a key/value pair on "="
 * If the split succeeds, then get the current value for the key from the dictionary.
 * If the key doesn’t exist, then add the new value as a Single value
 * If the key exists:
 *  If it is a Single item, then modify the value as a Multiple consisting
 *   of the old Single value and this new value
 *  If it is a Multiple (list of items), then add this new value to the
 *   list of items
 */
let addKeyValue =
    (accumulator: Js.Dict.t(queryItem), kvPair: string)
    : Js.Dict.t(queryItem) =>
  switch (Js.String.split("=", kvPair)) {
  | [|"", ""|] => accumulator
  | [|key, codedValue|] =>
    let value = makeSafe(codedValue);
    switch (Js.Dict.get(accumulator, key)) {
    | None => Js.Dict.set(accumulator, key, Single(value))
    | Some(v) =>
      switch (v) {
      | Single(s) => Js.Dict.set(accumulator, key, Multiple([value, s]))
      | Multiple(m) => Js.Dict.set(accumulator, key, Multiple([value, ...m]))
      }
    };
    accumulator;
  | _ => accumulator
  };

/*
 * parseQueryString creates a dictionary (keyed by string) of queryItems
 */
let parse = (qString: string) : Js.Dict.t(queryItem) => {
  let result: Js.Dict.t(queryItem) = Js.Dict.fromList([]);
  let kvPairs = Js.String.split("&", qString);
  Array.fold_left(addKeyValue, result, kvPairs);
};

let get = (query: Js.Dict.t(queryItem), key: string) : queryResult => {
  let item = Js.Dict.get(query, key);
  switch (item) {
  | Some(Single(s)) => Single(s)
  | Some(Multiple(s)) => Multiple(s)
  | None => None
  };
};

let getSingle = (query: Js.Dict.t(queryItem), key: string) => {
  let item = Js.Dict.get(query, key);
  switch (item) {
  | Some(Single(s)) => Some(s)
  | Some(Multiple(s)) => Some(List.hd(s))
  | None => None
  };
};