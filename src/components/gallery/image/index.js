// @flow
import { Component } from "react";
import * as React from "react";
import style from "./style";
import CircleLoader from "../../circle_loader";

type Props = {
  name: string,
  thumbnail: string,
  src: string,
  index: number,
  handleOpen: () => void,
  innerRef: () => void
};

/**
 * Component for a gallery image
 * @param {object} props
 * @return {ReactElement}
 */
export default function Image({
  name,
  thumbnail,
  src,
  index,
  handleOpen,
  innerRef
}: Props) {
  let image = thumbnail ? (
    <img src={thumbnail} class={style.thumbnail} width="300" height="225" />
  ) : (
    <CircleLoader />
  );
  return (
    <div class={style.item} onClick={handleOpen} ref={innerRef}>
      {image}
      <div class={style.item__details}>{name}</div>
    </div>
  );
}
