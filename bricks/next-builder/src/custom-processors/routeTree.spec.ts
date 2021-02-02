import { routeTree, RouteTreeNode } from "./routeTree";
import { BuilderRouteNode } from "./interfaces";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("routeTree", () => {
  it.each<[string, BuilderRouteNode[], string | undefined, RouteTreeNode[]]>([
    [
      "should work",
      [
        {
          id: "R-01",
          path: "/a",
          type: "bricks",
          parent: [],
        },
        {
          id: "R-02",
          path: "/b",
          type: "routes",
        },
        {
          id: "R-03",
          path: "/b/c",
          type: "bricks",
          parent: [{ id: "R-02" }],
        },
        {
          id: "R-04",
          path: "/a/d",
          type: "bricks",
          parent: [{ id: "R-01" }],
        },
        {
          id: "R-05",
          path: "/a/e",
          type: "bricks",
          parent: [],
        },
        {
          id: "R-06",
          path: "/a/f",
          type: "bricks",
          parent: [{ id: "R-01" }],
        },
      ],
      undefined,
      [
        {
          id: "R-01",
          path: "/a",
          type: "bricks",
          parent: [],
          key: "R-01",
          title: "/a",
          children: [
            {
              id: "R-04",
              path: "/a/d",
              type: "bricks",
              parent: [{ id: "R-01" }],
              key: "R-04",
              title: "/a/d",
            },
            {
              id: "R-06",
              path: "/a/f",
              type: "bricks",
              parent: [{ id: "R-01" }],
              key: "R-06",
              title: "/a/f",
            },
          ],
        },
        {
          id: "R-02",
          path: "/b",
          type: "routes",
          key: "R-02",
          title: "/b",
          children: [
            {
              id: "R-03",
              path: "/b/c",
              type: "bricks",
              parent: [{ id: "R-02" }],
              key: "R-03",
              title: "/b/c",
            },
          ],
        },
        {
          id: "R-05",
          path: "/a/e",
          type: "bricks",
          parent: [],
          key: "R-05",
          title: "/a/e",
        },
      ],
    ],
    [
      "should filter routes with brick parent",
      [
        {
          id: "R-01",
          path: "/a",
          type: "bricks",
          parent: [],
        },
        {
          id: "R-02",
          path: "/b",
          type: "routes",
        },
        {
          id: "R-03",
          path: "/b/c",
          type: "bricks",
          parent: [{ id: "R-02" }],
        },
        {
          id: "R-04",
          path: "/a/d",
          type: "bricks",
          parent: [{ id: "B-01" }],
          mountPoint: "m2",
        },
        {
          id: "R-05",
          path: "/a/e",
          type: "bricks",
          parent: [{ id: "B-01" }],
          mountPoint: "m2",
        },
      ],
      undefined,
      [
        {
          id: "R-01",
          path: "/a",
          type: "bricks",
          parent: [],
          key: "R-01",
          title: "/a",
        },
        {
          id: "R-02",
          path: "/b",
          type: "routes",
          key: "R-02",
          title: "/b",
          children: [
            {
              id: "R-03",
              path: "/b/c",
              type: "bricks",
              parent: [{ id: "R-02" }],
              key: "R-03",
              title: "/b/c",
            },
          ],
        },
      ],
    ],
    [
      "should work with selectedId",
      [
        {
          id: "R-01",
          path: "/a",
          type: "bricks",
          parent: [],
        },
        {
          id: "R-02",
          path: "/a/b",
          type: "bricks",
          parent: [{ id: "R-01" }],
        },
      ],
      "R-02",
      [
        {
          id: "R-01",
          path: "/a",
          type: "bricks",
          parent: [],
          key: "R-01",
          title: "/a",
          children: [
            {
              id: "R-02",
              path: "/a/b",
              type: "bricks",
              parent: [{ id: "R-01" }],
              key: "R-02",
              title: "/a/b",
              selected: true,
            },
          ],
        },
      ],
    ],
    ["should work with empty routeData", [], undefined, []],
  ])(
    "routeTree should work %s",
    (condition, routeData, selectedId, routeTreeData) => {
      expect(routeTree(routeData, selectedId)).toEqual(routeTreeData);
    }
  );
});
