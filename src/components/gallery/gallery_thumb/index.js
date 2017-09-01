// @flow
import { Component } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import style from "./style";

type thumbArgs = {
  name: string,
  slug: string,
  innerRef: () => void
};

/**
 * Returns a GalleryThumb Component 
 * @param {object} params
 * @return {ReactElement}
 */
export default function GalleryThumb({ name, slug, innerRef }: thumbArgs) {
  const link = "/gallery/" + slug;
  return (
    <Link to={link} class={style.item} innerRef={innerRef}>
      <svg viewBox="0 0 8 8" width="200px" class={style.icon}>
        <path
          d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
          id="folder"
        />
      </svg>
      <div class={style.item__details}>{name}</div>
    </Link>
  );
}
