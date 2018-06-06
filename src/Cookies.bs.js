// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

import * as $$String from "../node_modules/bs-platform/lib/es6/string.js";
import * as Caml_int32 from "../node_modules/bs-platform/lib/es6/caml_int32.js";

function createCookie(name, value, days, _) {
  if (days) {
    var date = new Date();
    var offset = date.getTime() + Caml_int32.imul(Caml_int32.imul(Caml_int32.imul(Caml_int32.imul(days[0], 24), 60), 60), 1000);
    date.setTime(offset);
    var expires = date.toUTCString();
    document.cookie = name + ("=" + (value + ("; expires" + (expires + "; path=/"))));
    return /* () */0;
  } else {
    document.cookie = name + ("=" + (value + "; path=/"));
    return /* () */0;
  }
}

function readCookie(name) {
  var nameEQ = name + "=";
  var cookieChunks = document.cookie.split(";").map($$String.trim);
  var match = cookieChunks.find((function (s) {
          return s.startsWith(nameEQ);
        }));
  if (match !== undefined) {
    return /* Some */[match.substring(nameEQ.length)];
  } else {
    return /* None */0;
  }
}

function eraseCookie(name) {
  return createCookie(name, "", /* Some */[-1], /* () */0);
}

function loggedIn() {
  var token = readCookie("access_token");
  if (token) {
    return token[0].length > 0;
  } else {
    return false;
  }
}

function logOut($staropt$star, _) {
  var setWarning = $staropt$star ? $staropt$star[0] : false;
  if (setWarning) {
    localStorage.setItem("loginFlash", "Your login has expired or is invalid.");
  }
  return eraseCookie("access_token");
}

export {
  createCookie ,
  readCookie ,
  eraseCookie ,
  loggedIn ,
  logOut ,
  
}
/* No side effect */
