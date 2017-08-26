// @flow
import React, { Component } from "react";
import style from "./style";
import { Link } from "react-router-dom";

type PropTypes = {
  path: string,
  slug: string,
  name: string
};

export default ({ path, slug, name }: PropTypes) => {
  if (slug == "root") {
    return (
      <div class={style.galleryHeader}>
        <Link activeClassName="active" to="/gallery">
          Gallery
        </Link>
      </div>
    );
  }

  const splitSlug = slug.split("/").slice(0, -1);

  const pathObjs = splitSlug.reduce((acc, section, idx) => {
    let s = splitSlug.slice(0, idx);
    let name = path[idx];
    s.push(section);
    acc.push({
      name: name,
      path: `/gallery/${s.join("/")}`
    });
    return acc;
  }, []);

  const links = pathObjs.map(({ name, path }, idx) => {
    return (
      <span key={idx}>
        <Link activeClassName="active" to={path}>
          {name}
        </Link>{" "}
        /
      </span>
    );
  });

  return (
    <div class={style.galleryHeader}>
      <Link activeClassName="active" to="/gallery">
        Gallery
      </Link>{" "}
      /
      {links} {name}
    </div>
  );
};
