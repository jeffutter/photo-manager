let styles: Js.t 'a = [%bs.raw "require('./components/gallery/bread_crumbs/style.scss')"];

let component = ReasonReact.statelessComponent "BreadCrumbs";

type linkData = {
  name: string,
  path: string
};

let make path::(path: 'a) slug::(slug: string) name::(name: string) _children => {
  ...component,
  render: fun _self =>
    switch slug {
    | "root" =>
      <div className=styles##galleryHeader>
        <NavLink activeClassName="active" _to="/gallery">
          (ReasonReact.stringToElement "Gallery")
        </NavLink>
      </div>
    | _ =>
      let splitSlug = slug |> Js.String.split "/" |> Js.Array.slice start::0 end_::(-1);
      let pathObjs =
        Js.Array.reducei
          (
            fun acc section idx => {
              let s = Js.Array.slice start::0 end_::idx splitSlug;
              let n = path.(idx);
              let p = Js.Array.joinWith "/" s;
              ignore (Js.Array.push section s);
              ignore (Js.Array.push {name: n, path: "/gallery/" ^ p} acc);
              acc
            }
          )
          [||]
          splitSlug;
      let links =
        Js.Array.mapi
          (
            fun {name: n, path: p} idx =>
              <span key=(Js.Int.toString idx)>
                <NavLink activeClassName="active" _to=p> (ReasonReact.stringToElement n) </NavLink>
                (ReasonReact.stringToElement " / ")
              </span>
          )
          pathObjs;
      let rootNavLink =
        <NavLink activeClassName="active" _to="/gallery">
          (ReasonReact.stringToElement "Gallery")
        </NavLink>;
      ReasonReact.createDomElement
        "div"
        props::{"className": styles##galleryHeader}
        (
          Array.concat [
            [|rootNavLink, ReasonReact.stringToElement " / "|],
            links,
            [|ReasonReact.stringToElement name|]
          ]
        )
    }
};
