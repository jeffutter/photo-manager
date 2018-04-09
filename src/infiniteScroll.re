[@bs.scope "Children"] [@bs.module "react"]
external count : array(ReasonReact.reactElement) => int = "";

type state = {
  instance: option(Brick.t),
  childrenCount: int,
  container: ref(option(Dom.element)),
};

type action =
  | ChildrenUpdated;

let component = ReasonReact.reducerComponent("InfiniteScroll");

let setContainerRef = (r, {ReasonReact.state}) =>
  state.container := Js.Nullable.toOption(r);

let make =
    (
      ~className="",
      ~pack=false,
      ~packed="data-packed",
      ~position=true,
      ~sizes=[|
               {"mq": "0px", "columns": 1, "gutter": 20},
               {"mq": "768px", "columns": 2, "gutter": 20},
               {"mq": "1024px", "columns": 3, "gutter": 20},
             |],
      children,
    ) => {
  ...component,
  initialState: () => {
    instance: None,
    childrenCount: 0,
    container: ref(None),
  },
  reducer: (action, state) =>
    switch (action) {
    | ChildrenUpdated =>
      let currCount = count(children);
      let prevCount = state.childrenCount;
      if (currCount != prevCount) {
        let newState = {...state, childrenCount: currCount};
        ReasonReact.UpdateWithSideEffects(
          newState,
          (
            _self =>
              switch (state.instance) {
              | None => ()
              | Some(i) =>
                if (pack) {
                  Brick.pack(i);
                  ();
                } else {
                  Brick.update(i);
                }
              }
          ),
        );
      } else {
        ReasonReact.NoUpdate;
      };
    },
  didMount: ({reduce: _reduce, state}) =>
    switch (state.container^) {
    | Some(c) =>
      let instance =
        Brick.brick({
          "container": c,
          "packed": packed,
          "sizes": sizes,
          "position": position,
        });
      let newState = {...state, instance: Some(instance)};
      ReasonReact.UpdateWithSideEffects(
        newState,
        (
          self => {
            Brick.resize(instance, Js.true_);
            Brick.pack(instance);
            self.reduce(() => ChildrenUpdated, ());
          }
        ),
      );
    | None =>
      ignore(Js.Exn.raiseError("Bricks Container Missing"));
      ReasonReact.NoUpdate;
    },
  didUpdate: ({newSelf}) => newSelf.reduce(() => ChildrenUpdated, ()),
  willUnmount: ({state}) =>
    switch (state.instance) {
    | None => ()
    | Some(i) => Brick.resize(i, Js.false_)
    },
  render: self =>
    ReasonReact.createDomElement(
      "div",
      ~props={"className": className, "ref": self.handle(setContainerRef)},
      children,
    ),
};
