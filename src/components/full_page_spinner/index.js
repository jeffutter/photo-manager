// @flow
import React, { Component } from "react";
import style from "./style";

/**
 * Full Page Spinner Element
 * @return {ReactElement}
 */
export default function FullPageSpinner() {
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
