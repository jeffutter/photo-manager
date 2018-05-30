type retainedProps = {
  name: string,
  slug: string,
  thumbnail: option(string),
  rating: option(int),
};

type self = {retainedProps};

let component =
  ReasonReact.statelessComponentWithRetainedProps("WaypointItem");

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string)=?,
      ~rating: option(int)=?,
      children,
    ) => {
  ...component,
  retainedProps: {
    name,
    slug,
    thumbnail,
    rating,
  },
  shouldUpdate:
    (
      {
        oldSelf: {retainedProps: (oldRetainedProps: retainedProps)},
        newSelf: {retainedProps: (newRetainedProps: retainedProps)},
      },
    ) =>
    oldRetainedProps != newRetainedProps,
  render: (_) =>
    <Waypoint
      ?onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div> (children()) </div>
    </Waypoint>,
};