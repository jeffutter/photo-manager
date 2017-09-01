// @flow

const Raven = (function(global, document, url) {
  let calls = [];
  let spy = {};

  let methods = ["config", "install", "setUserContext", "captureException"];
  for (let i = 0, method; (method = methods[i]); i += 1) {
    spy[method] = (function(name) {
      return function(...args) {
        calls.push([name, ...args]);
        return this;
      };
    })(method);
  }

  const define = Object.defineProperty;
  define(global, "Raven", {
    get: function() {
      return spy;
    },
    set: function(Raven) {
      global.removeEventListener("error", captureUnhandledExceptions);
      for (let i = 0, exception; (exception = unhandledExceptions[i]); i += 1) {
        calls.push(["captureException", exception]);
      }

      define(global, "Raven", {
        value: Raven,
        writable: true,
        enumerable: true,
        configurable: true
      });

      for (let i = 0, call; (call = calls[i]); i += 1) {
        // Raven[call[0]].apply(Raven, call[1]);
        Raven[call[0]](call[1]);
      }
    },
    enumerable: true,
    configurable: true
  });

  let unhandledExceptions = [];

  /**
   * Captures unhandled exceptions
   * @param {anything} event 
   */
  function captureUnhandledExceptions(event) {
    unhandledExceptions.push([
      event.error || new Error(event.message),
      {
        extra: {
          file: event.filename,
          line: event.lineno,
          column: event.colno
        }
      }
    ]);
  }

  global.addEventListener("error", captureUnhandledExceptions);

  global.addEventListener("load", function() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.src = url;

    const firstScript = document.getElementsByTagName("script")[0];
    if (!firstScript) return;
    if (!firstScript.parentNode) return;
    firstScript.parentNode.insertBefore(script, firstScript);
  });

  return global.Raven;
})(window, document, "https://cdn.ravenjs.com/3.17.0/raven.min.js");

export default Raven;
