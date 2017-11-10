open Glamor;

let component = ReasonReact.statelessComponent("WaypointGalleryThumb");

let cls = css([width("320px"), height("270px")]);

let make = (~onEnter: option(('a => unit))=?, ~name: string, ~slug: string, _children) => {
  ...component,
  render: (_) =>
    <Waypoint ?onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div className=cls> <GalleryThumb name slug /> </div>
    </Waypoint>
};