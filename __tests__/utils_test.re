open Jest;

describe("chunkList", () =>
  Expect.(
    test("chunk by 1", () => {
      let subject = [1, 2, 3, 4, 5];
      expect(Utils.chunkList(1, subject))
      |> toBe([[1], [2], [3], [4], [5]]);
    })
  )
);