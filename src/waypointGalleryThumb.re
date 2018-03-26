open Css;

let component = ReasonReact.statelessComponent("WaypointGalleryThumb");

let cls = style([width(px(320)), height(px(270))]);

let make =
    (~onEnter: option('a => unit)=?, ~name: string, ~slug: string, _children) => {
  ...component,
  render: (_) =>
    <Waypoint
      ?onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div className=cls> <GalleryThumb name slug /> </div>
    </Waypoint>,
};