let component = ReasonReact.statelessComponent("WaypointImage");

let make =
    (~onEnter: 'a => unit, ~name: string, ~thumbnail: option(string), ~handleOpen, _children) => {
  ...component,
  render: (_) =>
    <Waypoint onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div style=(ReactDOMRe.Style.make(~width="320px", ~height="270px", ()))>
        <GalleryImage name ?thumbnail handleOpen />
      </div>
    </Waypoint>
};
