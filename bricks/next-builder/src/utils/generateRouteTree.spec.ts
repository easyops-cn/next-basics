import { generateRouteTree, GenerateRouteTreeParams } from "./generateRouteTree";
import { RouteTreeNode } from "../interface";

describe("generateRouteTree", () => {
  it.each<[string, GenerateRouteTreeParams , RouteTreeNode[]]>([
    [
      "should work",
      {
        data: [
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
        ]
      },
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
      {
        data: [
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
        disableParentNodeSelectable: true
      },
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
          selectable: false,
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
      {
        data: [
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
        selectedId: "R-02"
      },
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
    ["should work with empty routeData", {data:[]}, []],
  ])(
    "routeTree should work %s",
    (condition, params, routeTreeData) => {
      expect(generateRouteTree(params)).toEqual(routeTreeData);
    }
  );
});
