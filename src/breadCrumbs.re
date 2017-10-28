open Glamor;

let component = ReasonReact.statelessComponent("BreadCrumbs");

type linkData = {
  name: string,
  path: string
};

let cls =
  css([
    margin("1rem 0"),
    fontSize("2em"),
    Selector(
      "& a",
      [
        textDecoration("none"),
        borderBottom("1px solid #ccc"),
        Selector("&:active, &:visited", [color("inherit")])
      ]
    )
  ]);

let activeCls = css([color("inherit")]);

let make = (~path: 'a, ~slug: string, ~name: string, _children) => {
  ...component,
  render: (_self) =>
    switch slug {
    | "root" =>
      <div className=cls>
        <ReactRouterDom.NavLink activeClassName=activeCls _to="/gallery">
          (ReasonReact.stringToElement("Gallery"))
        </ReactRouterDom.NavLink>
      </div>
    | _ =>
      let splitSlug = slug |> Js.String.split("/") |> Js.Array.slice(~start=0, ~end_=(-1));
      let pathObjs =
        Js.Array.reducei(
          (acc, section, idx) => {
            let s = Js.Array.slice(~start=0, ~end_=idx, splitSlug);
            let n = path[idx];
            let p = Js.Array.joinWith("/", s);
            ignore(Js.Array.push(section, s));
            ignore(Js.Array.push({name: n, path: "/gallery/" ++ p}, acc));
            acc
          },
          [||],
          splitSlug
        );
      let links =
        Js.Array.mapi(
          ({name: n, path: p}, idx) =>
            <span key=(Js.Int.toString(idx))>
              <ReactRouterDom.NavLink activeClassName=activeCls _to=p>
                (ReasonReact.stringToElement(n))
              </ReactRouterDom.NavLink>
              (ReasonReact.stringToElement(" / "))
            </span>,
          pathObjs
        );
      let rootNavLink =
        <ReactRouterDom.NavLink activeClassName=activeCls _to="/gallery">
          (ReasonReact.stringToElement("Gallery"))
        </ReactRouterDom.NavLink>;
      ReasonReact.createDomElement(
        "div",
        ~props={"className": cls},
        Array.concat([
          [|rootNavLink, ReasonReact.stringToElement(" / ")|],
          links,
          [|ReasonReact.stringToElement(name)|]
        ])
      )
    }
};
