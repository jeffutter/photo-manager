let debounce
    waitMs::(waitMs: int)
    trailing::(trailing: bool)=true
    leading::(leading: bool)=false
    func => {
  let noop () => ();
  let timeout = ref (Js.Global.setTimeout noop waitMs);
  let callCount = ref 0;
  fun event => {
    if leading {
      if (!callCount == 0) {
        func event;
        callCount := !callCount + 1
      }
    };
    Js.Global.clearTimeout !timeout;
    timeout :=
      Js.Global.setTimeout
        (
          fun _ => {
            if (trailing || leading && !callCount == 0) {
              func event
            };
            callCount := 0
          }
        )
        waitMs
  }
};

let sortBy func array => {
  let copy = Js.Array.copy array;
  Js.Array.sortInPlaceWith
    (
      fun a b => {
        let valA = func a;
        let valB = func b;
        switch (valA, valB) {
        | (a, b) when a < b => (-1)
        | (a, b) when b < a => 1
        | _ => 0
        }
      }
    )
    copy
};

let chunk size array =>
  Js.Array.reduce
    (
      fun acc item => {
        let lastChunk = acc.(Js.Array.length acc - 1);
        switch (Js.Array.length lastChunk) {
        | length when length < size =>
          ignore (Js.Array.push item lastChunk);
          acc
        | _ =>
          ignore (Js.Array.push [|item|] acc);
          acc
        }
      }
    )
    [|[||]|]
    array;
