type raven;

[@bs.module "raven-js"] external ravenConfig: string => raven = "config";

[@bs.send] external ravenInstall: raven => unit = "install";

let setup = (dsn: string): unit =>
  dsn |> ravenConfig |> ravenInstall |> ignore;
