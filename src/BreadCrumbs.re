open Css;

type linkData = {
  name: string,
  path: string,
};

let cls =
  style([
    margin2(~v=rem(1.0), ~h=zero),
    fontSize(em(2.0)),
    selector(
      "& a",
      [
        textDecoration(none),
        borderBottom(px(1), `solid, hex("ccc")),
        selector("&:active, &:visited", [unsafe("color", "inherit")]),
      ],
    ),
  ]);

let activeCls = style([unsafe("color", "inherit")]);

[@react.component]
let make = (~path: 'a, ~slug: string, ~name: string) => {
  switch (slug) {
  | "root" =>
    <div className=cls>
      <NavLink className=activeCls _to="/gallery">
        {React.string("Gallery")}
      </NavLink>
    </div>
  | _ =>
    let splitSlug =
      slug |> Js.String.split("/") |> Js.Array.slice(~start=0, ~end_=-1);
    let pathObjs =
      Js.Array.reducei(
        (acc, section, idx) => {
          let s = Js.Array.slice(~start=0, ~end_=idx, splitSlug);
          let n = path[idx];
          let p = Js.Array.joinWith("/", s);
          ignore(Js.Array.push(section, s));
          ignore(Js.Array.push({name: n, path: "/gallery/" ++ p}, acc));
          acc;
        },
        [||],
        splitSlug,
      );
    let links =
      Js.Array.mapi(
        ({name: n, path: p}, idx) =>
          <span key={Js.Int.toString(idx)}>
            <NavLink className=activeCls _to=p> {React.string(n)} </NavLink>
            {React.string(" / ")}
          </span>,
        pathObjs,
      );
    let rootNavLink =
      <NavLink className=activeCls _to="/gallery">
        {React.string("Gallery")}
      </NavLink>;

    <div className=cls>
      rootNavLink
      {React.string(" / ")}
      {React.array(links)}
      {React.string(name)}
    </div>;
  };
};