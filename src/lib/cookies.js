// @flow

/**
 * Creates a cookie
 * @param {string} name
 * @param {string} value
 * @param {numeber} days
 */
export function createCookie(name: string, value: string, days: number) {
  let expires;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else expires = "";
  document.cookie = `${name}=${value}${expires}; path=/`;
}

/**
 * Reads a cookie
 * @param {string} name
 * @return {string}
 */
export function readCookie(name: string) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Deletes a cookie
 * @param {string} name
 */
export function eraseCookie(name: string) {
  createCookie(name, "", -1);
}

/**
 * Checks wether or not we are 'logged in'
 * @return {bool}
 */
export function loggedIn() {
  const token = readCookie("access_token");
  if (token && token.length > 0) return true;
  return false;
}
