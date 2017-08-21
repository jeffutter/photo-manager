// @flow
import client from "./client";
import { eraseCookie } from "./cookies";

const logout = () => {
  eraseCookie("access_token");
  client.resetStore();
};

export default logout;
