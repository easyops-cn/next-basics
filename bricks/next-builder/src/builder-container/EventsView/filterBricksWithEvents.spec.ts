import { filterBricksWithEvents } from "./filterBricksWithEvents";

describe("filterBricksWithEvents", () => {
  const bricksWithEvents = [
    {
      node: {
        $$uid: 1,
        alias: "my-alias-brick",
      },
    },
    {
      node: {
        $$uid: 2,
        brick: "my.another-brick",
      },
    },
    {
      node: {
        $$uid: 3,
        alias: "someone-else-alias-brick",
      },
    },
    {
      node: {
        $$uid: 4,
        brick: "someone-else.another-brick",
      },
    },
  ] as any;

  it.each<[string, number[]]>([
    [null, [1, 2, 3, 4]],
    ["my", [1, 2]],
  ])("should work", (q, result) => {
    expect(
      filterBricksWithEvents(bricksWithEvents, q).map((item) => item.node.$$uid)
    ).toEqual(result);
  });
});
