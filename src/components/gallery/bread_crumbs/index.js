/* @flow */
import { h, Component } from "preact";
import style from "./style";
import { Link } from "react-router-dom";

export default ({ path, slug, name }) => {
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
    console.log(path, idx, path[idx]);
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
