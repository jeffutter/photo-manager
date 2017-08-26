// @flow
import React, { Component } from "react";
import style from "./style";

export default function() {
  return (
    <div class={style.container}>
      <div class={style.spinner}>
        <div class={style.bounce1} />
        <div class={style.bounce2} />
        <div />
      </div>
    </div>
  );
}
