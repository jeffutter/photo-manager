open Css;

let component = ReasonReact.statelessComponent("BreadCrumbs");

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
        selector(
          "&:active, &:visited",
          [`declaration(("color", "inherit"))],
        ),
      ],
    ),
  ]);

let activeCls = style([`declaration(("color", "inherit"))]);

let make = (~path: 'a, ~slug: string, ~name: string, _children) => {
  ...component,
  render: _self =>
    switch (slug) {
    | "root" =>
      <div className=cls>
        <NavLink className=activeCls _to="/gallery">
          (ReasonReact.stringToElement("Gallery"))
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
            <span key=(Js.Int.toString(idx))>
              <NavLink className=activeCls _to=p>
                (ReasonReact.stringToElement(n))
              </NavLink>
              (ReasonReact.stringToElement(" / "))
            </span>,
          pathObjs,
        );
      let rootNavLink =
        <NavLink className=activeCls _to="/gallery">
          (ReasonReact.stringToElement("Gallery"))
        </NavLink>;
      ReasonReact.createDomElement(
        "div",
        ~props={"className": cls},
        Array.concat([
          [|rootNavLink, ReasonReact.stringToElement(" / ")|],
          links,
          [|ReasonReact.stringToElement(name)|],
        ]),
      );
    },
};
