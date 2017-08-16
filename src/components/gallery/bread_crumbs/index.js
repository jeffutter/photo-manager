/* @flow */
import { h, Component } from "preact";
import style from "./style";
import { Link } from "preact-router/match";

export default ({ path, slug, name }) => {
  if (slug == "root") {
    return (
      <div class={style.galleryHeader}>
        <Link activeClassName="active" href="/gallery">
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
        <Link activeClassName="active" href={path}>
          {name}
        </Link>{" "}
        /
      </span>
    );
  });

  return (
    <div class={style.galleryHeader}>
      <Link activeClassName="active" href="/gallery">
        Gallery
      </Link>{" "}
      /
      {links} {name}
    </div>
  );
};
