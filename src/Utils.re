let sortBy = (func, array) => {
  let copy = Js.Array.copy(array);
  Js.Array.sortInPlaceWith(
    (a, b) => {
      let valA = func(a);
      let valB = func(b);
      switch (valA, valB) {
      | (a, b) when a < b => (-1)
      | (a, b) when b < a => 1
      | _ => 0
      };
    },
    copy,
  );
};

let chunkList = (size, list) =>
  List.fold_left(
    (acc, item) => {
      let (lastChunk, rest) =
        switch (acc) {
        | [] => ([], [])
        | [lastChunk, ...rest] => (lastChunk, rest)
        };
      switch (List.length(lastChunk)) {
      | length when length < size => [[item, ...lastChunk], ...rest]
      | _ => [[item], ...acc]
      };
    },
    [],
    list,
  );

let chunkArray = (size, array) =>
  array |> Array.to_list |> chunkList(size) |> List.rev |> Array.of_list;
