module History = {
  type t;
  module Location = {
    type t;
    [@bs.get] external pathname: t => string = "pathname";
    [@bs.get] external search: t => string = "search";
    [@bs.get] external hash: t => string = "hash";
    [@bs.get] [@bs.return null_undefined_to_opt]
    external key: t => option(string) = "key";
  };
  type action = [ | `PUSH | `REPLACE | `POP]; /*  [@@bs.string] */
  [@bs.get] external length: t => int = "length";
  [@bs.get] external action: t => action = "action";
  [@bs.get] external location: t => string = "location";
  [@bs.send]
  external listen:
    (t, [@bs.uncurry] ((~location: Location.t, ~action: action) => unit)) =>
    unit =
    "listen";
  /* TODO: state typing */
  module State = {
    type t;
  };
  [@bs.send]
  external push: (t, ~url: string, ~state: list(State.t)) => unit = "push";
  [@bs.send]
  external replace: (t, ~url: string, ~state: list(State.t)) => unit =
    "replace";
  [@bs.send] external go: (t, ~jumps: int) => unit = "go";
  [@bs.send] external goBack: t => unit = "goBack";
  [@bs.send] external goForward: t => unit = "goForward";
};

type getUserConfirmation = (~path: string, ~confirmation: bool) => unit;

type browserHistoryOpt = {
  basename: string,
  forceRefresh: bool,
  keyLength: int,
  getUserConfirmation,
};

[@bs.module "history"]
external createBrowserHistory: browserHistoryOpt => History.t =
  "createBrowserHistory";

type memoryHistoryOpt = {
  initialEntries: list(string),
  initialIndex: int,
  keyLength: int,
};

[@bs.module]
external createMemoryHistory: memoryHistoryOpt => History.t =
  "createMemoryHistory";

type hashHistoryOpt = {
  basename: string,
  hashType: string,
  getUserConfirmation,
};

[@bs.module]
external createHashHistory: hashHistoryOpt => History.t = "createHashHistory";