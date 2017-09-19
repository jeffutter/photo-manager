let component = ReasonReact.statelessComponent "WaypointImage";

let make
    onEnter::(onEnter: 'a => unit)
    name::(name: string)
    thumbnail::(thumbnail: option string)
    ::handleOpen
    _children => {
  ...component,
  render: fun _ =>
    <Waypoint onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div style=(ReactDOMRe.Style.make width::"320px" height::"270px" ())>
        <GalleryImage name thumbnail=?thumbnail handleOpen />
      </div>
    </Waypoint>
};
