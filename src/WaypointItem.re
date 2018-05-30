open Css;

type state = {visible: bool};

type action =
  | Visible
  | NotVisible;

type retainedProps = {
  name: string,
  slug: string,
  thumbnail: option(string),
  rating: option(int),
};

let cls = (~w, ~h) => style([width(px(w)), height(px(h))]);

type self = {retainedProps};

let component = ReasonReact.reducerComponentWithRetainedProps("WaypointItem");

let makeVisible = send => send(Visible);

let makeNotVisible = send => send(NotVisible);

let make =
    (
      ~onEnter: option('a => unit)=?,
      ~onLeave: option('a => unit)=?,
      ~name: string,
      ~slug: string,
      ~thumbnail: option(string)=?,
      ~rating: option(int)=?,
      ~w: int,
      ~h: int,
      children,
    ) => {
  ...component,
  initialState: () => {visible: false},
  reducer: (action, _state) =>
    switch (action) {
    | Visible => ReasonReact.Update({visible: true})
    | NotVisible => ReasonReact.Update({visible: false})
    },
  retainedProps: {
    name,
    slug,
    thumbnail,
    rating,
  },
  shouldUpdate:
    (
      {
        oldSelf: {
          state: oldState,
          retainedProps: (oldRetainedProps: retainedProps),
        },
        newSelf: {
          state: newState,
          retainedProps: (newRetainedProps: retainedProps),
        },
      },
    ) =>
    oldState != newState || oldRetainedProps != newRetainedProps,
  render: self => {
    let oEnter =
      switch (onEnter) {
      | Some(func) => (
          () => {
            func();
            makeVisible(self.send);
          }
        )
      | None => (() => makeVisible(self.send))
      };
    let oLeave =
      switch (onLeave) {
      | Some(func) => (
          () => {
            func();
            makeNotVisible(self.send);
          }
        )
      | None => (() => makeNotVisible(self.send))
      };
    <Waypoint
      onEnter=oEnter
      onLeave=oLeave
      bottomOffset="-400px"
      topOffset="200px"
      fireOnRapidScroll=false>
      <div className=(cls(~w, ~h))>
        (children(~visible=self.state.visible))
      </div>
    </Waypoint>;
  },
};