// @flow
export function createCookie(name: string, value: string, days: number) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toUTCString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

export function readCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  createCookie(name, "", -1);
}

export function loggedIn() {
  const token = readCookie("access_token");
  if (token && token.length > 0) return true;
  return false;
}
