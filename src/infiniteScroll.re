external count : array ReasonReact.reactElement => int =
  "" [@@bs.scope "Children"] [@@bs.module "react"];

type state = {
  instance: option Brick.t,
  childrenCount: int,
  container: ref (option Dom.element)
};

type action =
  | ChildrenUpdated
  | InstanceCreated Brick.t;

let component = ReasonReact.reducerComponent "InfiniteScroll";

let setContainerRef r {ReasonReact.state: state} => state.container := Js.Null.to_opt r;

let make
    ::className=""
    ::pack=false
    ::packed="data-packed"
    ::position=true
    ::sizes=[|
        {"mq": "0px", "columns": 1, "gutter": 20},
        {"mq": "768px", "columns": 2, "gutter": 20},
        {"mq": "1024px", "columns": 3, "gutter": 20}
      |]
    /* ::style={||} */
    children => {
  ...component,
  initialState: fun () => {instance: None, childrenCount: 0, container: ref None},
  reducer: fun action =>
    switch action {
    | InstanceCreated instance => (
        fun state => {
          Js.log "Container Created";
          Brick.resize instance true;
          if (count children > 0) {
            Brick.pack instance
          };
          ReasonReact.Update {...state, instance: Some instance}
        }
      )
    | ChildrenUpdated => (
        fun state => {
          Js.log "Children Updated";
          let currCount = count children;
          let prevCount = state.childrenCount;
          if (currCount != prevCount) {
            Js.log "New Count";
            switch state.instance {
            | None => ()
            | Some i =>
              if pack {
                Brick.pack i
              } else {
                Brick.update i
              }
            };
            ReasonReact.Update {...state, childrenCount: count children}
          } else {
            Js.log "Old Count";
            ReasonReact.NoUpdate
          }
        }
      )
    },
  /* didMount: fun {reduce, state} => {
       Js.log !state.container;
       reduce (fun () => ChildrenUpdated) ();
       ReasonReact.NoUpdate
     }, */
  didUpdate: fun {oldSelf, newSelf} => {
    Js.log oldSelf;
    Js.log newSelf;
    switch (!oldSelf.state.container, !newSelf.state.container) {
    | (None, Some container) =>
      let instance =
        Brick.brick {
          "container": container,
          "packed": packed,
          "sizes": sizes,
          "position": position
        };
      newSelf.reduce (fun () => InstanceCreated instance) ()
    | _ => ()
    };
    newSelf.reduce (fun () => ChildrenUpdated) ()
  },
  willUnmount: fun {state} =>
    switch state.instance {
    | None => ()
    | Some i => Brick.resize i false
    },
  render: fun self =>
    ReasonReact.createDomElement
      "div" props::{"className": className, "ref": self.handle setContainerRef} children
};

let default =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          className::?(Js.Nullable.to_opt jsProps##className)
          pack::?(Js.Nullable.to_opt jsProps##pack)
          packed::?(Js.Nullable.to_opt jsProps##packed)
          position::?(Js.Nullable.to_opt jsProps##position)
          sizes::?(Js.Nullable.to_opt jsProps##sizes)
          /* style::?(Js.Nullable.to_opt jsProps##style) */
          jsProps##children
    );
