// @flow
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import style from "./style";
import { loggedIn } from "../../lib/cookies";

/**
 * Gallery Component
 * @return {ReactElement}
 */
export default function LoginForm() {
  if (loggedIn()) return <Redirect to="/" />;

  let loginWarning;
  const loginFlash = localStorage.getItem("loginFlash");
  localStorage.removeItem("loginFlash");

  if (loginFlash && loginFlash.length > 0)
    loginWarning = (
      <div class={style.warning}>
        <svg width="18" height="18" viewBox="0 0 1792 1792">
          <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
        </svg>
        {loginFlash}
      </div>
    );

  return (
    <div class={style.center}>
      {loginWarning}
      <a
        class={[style.loginBtn, style.loginBtnFacebook].join(" ")}
        href="/auth/facebook"
      >
        <svg viewBox="0 0 33 33" width="22" height="22" class={style.f}>
          <path d="M 17.996,32L 12,32 L 12,16 l-4,0 l0-5.514 l 4-0.002l-0.006-3.248C 11.993,2.737, 13.213,0, 18.512,0l 4.412,0 l0,5.515 l-2.757,0 c-2.063,0-2.163,0.77-2.163,2.209l-0.008,2.76l 4.959,0 l-0.585,5.514L 18,16L 17.996,32z" />
        </svg>
        <span>Login With Facebook</span>
      </a>
    </div>
  );
}
