type document;

external document : document = "document" [@@bs.val];

external getCookie : document => string = "cookie" [@@bs.get];

external setCookie : document => string => unit = "cookie" [@@bs.set];

external resetStore : unit => unit =
  "resetStore" [@@bs.scope "default"] [@@bs.module "./lib/client.js"];

let createCookie name::(name: string) value::(value: string) days::(days: option int)=? () :unit =>
  switch days {
  | Some d =>
    let date = Js.Date.make ();
    let offset = Js.Date.getTime date +. float_of_int (d * 24 * 60 * 60 * 1000);
    ignore (Js.Date.setTime date offset);
    let expires = Js.Date.toUTCString date;
    setCookie document (name ^ "=" ^ value ^ "; expires" ^ expires ^ "; path=/")
  | None => setCookie document (name ^ "=" ^ value ^ "; path=/")
  };

let readCookie (name: string) :option string => {
  let nameEQ = name ^ "=";
  let cookieChunks =
    getCookie document |> Js.String.split ";" |> Js.Array.map (fun s => String.trim s);
  switch (Js.Array.find (fun s => Js.String.startsWith nameEQ s) cookieChunks) {
  | Some cookie => Some (Js.String.substringToEnd from::(Js.String.length nameEQ) cookie)
  | None => None
  }
};

let eraseCookie (name: string) :unit => createCookie ::name value::"" days::(-1) ();

let loggedIn () :bool => {
  let token = readCookie "access_token";
  switch token {
  | Some cookie => Js.String.length cookie > 0
  | None => false
  }
};

let logOut () :unit => {
  eraseCookie "access_token";
  resetStore ()
};
