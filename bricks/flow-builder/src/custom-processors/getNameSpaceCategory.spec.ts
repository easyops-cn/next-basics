import { getNameSpaceCategory } from "./getNameSpaceCategory";
import { CategoryNode } from "./interfaces";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getNameSpaceCategory", () => {
  const testCases: [{ id: string }[], CategoryNode[]][] = [
    [
      [
        {
          id: "a.b1.c1",
        },
        {
          id: "a.b1.c2",
        },
        {
          id: "a.b2.c3",
        },
        {
          id: "a.b2.c4",
        },
        {
          id: "a.b2.c5",
        },
        {
          id: "a.b3",
        },
      ],
      [
        {
          category: "category",
          key: "a",
          title: "a",
          children: [
            {
              category: "category",
              key: "a.b1",
              title: "b1",
              children: [
                {
                  category: "item",
                  key: "a.b1.c1",
                  title: "c1",
                },
                {
                  category: "item",
                  key: "a.b1.c2",
                  title: "c2",
                },
              ],
            },
            {
              category: "category",
              key: "a.b2",
              title: "b2",
              children: [
                {
                  category: "item",
                  key: "a.b2.c3",
                  title: "c3",
                },
                {
                  category: "item",
                  key: "a.b2.c4",
                  title: "c4",
                },
                {
                  category: "item",
                  key: "a.b2.c5",
                  title: "c5",
                },
              ],
            },
            {
              category: "item",
              key: "a.b3",
              title: "b3",
            },
          ],
        },
      ],
    ],
  ];
  test.each(testCases)("graphTree(...%j) should return %j", (input, output) => {
    expect(getNameSpaceCategory(input)).toEqual(output);
    // console.log(input, "haha",output)
  });
});
