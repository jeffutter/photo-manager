type retainedProps = {
  name: string,
  slug: string,
  thumbnail: option(string),
  rating: option(int)
};

type self = {retainedProps};

let component = ReasonReact.statelessComponentWithRetainedProps("WaypointImage");

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
  retainedProps: {name, slug, thumbnail, rating},
  shouldUpdate:
    (
      {
        oldSelf: {retainedProps: (oldRetainedProps: retainedProps)},
        newSelf: {retainedProps: (newRetainedProps: retainedProps)}
      }
    ) =>
    oldRetainedProps != newRetainedProps,
  render: (_) =>
    <Waypoint ?onEnter bottomOffset="-400px" topOffset="200px" fireOnRapidScroll=false>
      <div style=(ReactDOMRe.Style.make(~width="320px", ~height="300px", ()))>
        <GalleryImage name slug ?thumbnail ?rating submitRating handleOpen />
      </div>
    </Waypoint>
};
