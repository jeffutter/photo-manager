[@bs.deriving abstract]
type config = {dsn: string};
[@bs.module "@sentry/browser"] external _init: config => unit = "init";

let init = (~dsn: string): unit => {
  _init(config(~dsn));
};