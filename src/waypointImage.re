let component = ReasonReact.statelessComponent("WaypointImage");

let make =
    (
      ~onEnter: option(('a => unit))=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string),
      ~rating: option(int),
      ~handleOpen,
      ~submitRating,
      _children
    ) => {
  ...component,
  render: (_) =>
    <Waypoint ?onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div style=(ReactDOMRe.Style.make(~width="320px", ~height="300px", ()))>
        <GalleryImage name slug ?thumbnail ?rating submitRating handleOpen />
      </div>
    </Waypoint>
};
