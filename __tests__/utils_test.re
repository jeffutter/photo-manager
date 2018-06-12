open Jest;

describe("chunkList", () => {
  open Expect;
  test("chunk by 1", () => {
    let subject = [1, 2, 3, 4, 5];
    expect(Utils.chunkList(1, subject))
    |> toEqual([[1], [2], [3], [4], [5]]);
  });
  test("chunk by 2", () => {
    let subject = [1, 2, 3, 4, 5];
    expect(Utils.chunkList(2, subject)) |> toEqual([[1, 2], [3, 4], [5]]);
  });
  test("chunk by 3", () => {
    let subject = [1, 2, 3, 4, 5];
    expect(Utils.chunkList(3, subject)) |> toEqual([[1, 2, 3], [4, 5]]);
  });
  test("chunk by 4", () => {
    let subject = [1, 2, 3, 4, 5];
    expect(Utils.chunkList(4, subject)) |> toEqual([[1, 2, 3, 4], [5]]);
  });
});