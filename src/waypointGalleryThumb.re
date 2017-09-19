let component = ReasonReact.statelessComponent "WaypointGalleryThumb";

let make onEnter::(onEnter: 'a => unit) name::(name: string) slug::(slug: string) _children => {
  ...component,
  render: fun _ =>
    <Waypoint onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div style=(ReactDOMRe.Style.make width::"320px" height::"270px" ())>
        <GalleryThumb name slug />
      </div>
    </Waypoint>
};
