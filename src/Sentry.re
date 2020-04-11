[@bs.deriving abstract]
type sentryConfig = {
  dsn: string
};

[@bs.module "@sentry/browser"] external init: sentryConfig => unit = "init";
