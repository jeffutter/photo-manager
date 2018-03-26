open Css;

type retainedProps = {
  name: string,
  slug: string,
  thumbnail: option(string),
  rating: option(int),
};

let cls = style([width(px(320)), height(px(295))]);

type self = {retainedProps};

let component =
  ReasonReact.statelessComponentWithRetainedProps("WaypointImage");

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string),
      ~rating: option(int),
      ~handleOpen,
      ~submitRating,
      _children,
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
      <div className=cls>
        <GalleryImage name slug ?thumbnail ?rating submitRating handleOpen />
      </div>
    </Waypoint>,
};