import { BuilderGraphData, BuilderGraphDataParams } from "./BuilderGraphData";

describe("BuilderGraphData", () => {
  it.each<[string, BuilderGraphDataParams, any]>([
    [
      "should work",
      {
        routeList: [
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
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "brick-pkg.a",
            alias: "awesome-alias",
            parent: [{ id: "R-01" }],
            if: "false",
            lifeCycle: undefined,
          },
          {
            id: "B-02",
            type: "provider",
            brick: "brick-pkg.b",
            parent: [{ id: "R-01" }],
          },
          {
            id: "B-03",
            type: "brick",
            brick: "brick-pkg.c",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },
          {
            id: "B-04",
            type: "template",
            brick: "template-pkg.a",
            parent: [{ id: "B-03" }],
            mountPoint: "m1",
          },
        ],
        root: "R-01",
      },
      {
        list: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [],
            children: [
              {
                id: "B-01",
                type: "brick",
                brick: "brick-pkg.a",
                alias: "awesome-alias",
                parent: [{ id: "R-01" }],
                if: "false",
                lifeCycle: undefined,
                children: [
                  {
                    id: "B-03",
                    type: "brick",
                    brick: "brick-pkg.c",
                    alias: "c",
                    parent: [{ id: "B-01" }],
                    mountPoint: "m1",
                    children: [
                      {
                        id: "B-04",
                        type: "template",
                        brick: "template-pkg.a",
                        alias: "a",
                        parent: [{ id: "B-03" }],
                        mountPoint: "m1",
                      },
                    ],
                  },
                ],
              },
              {
                id: "B-02",
                type: "provider",
                brick: "brick-pkg.b",
                alias: "b",
                parent: [{ id: "R-01" }],
              },
            ],
          },
        ],
      },
    ],
    [
      "should return empty list when rootNode undefined",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [],
          },
        ],
        brickList: [],
        root: undefined,
      },
      {
        list: [],
      },
    ],
    [
      "should return empty list when all is empty",
      {
        routeList: [],
        brickList: [],
        root: "R-01",
      },
      {
        list: [],
      },
    ],
    [
      "should return empty list when all is undefined",
      {
        routeList: undefined,
        brickList: undefined,
      },
      {
        list: [],
      },
    ],
    [
      "should highlight match nodes",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [],
          },
          {
            id: "R-02",
            path: "/b",
            type: "bricks",
            parent: [{ id: "UNDEFINED-ID" }],
          },
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "brick-pkg.a",
            alias: "awesome-alias",
            parent: [{ id: "R-01" }],
          },
        ],
        root: "R-01",
        highlightNodes: [{ id: "B-01" }, { id: "B-02" }],
      },
      {
        list: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [],
            children: [
              {
                id: "B-01",
                type: "brick",
                brick: "brick-pkg.a",
                alias: "awesome-alias",
                parent: [{ id: "R-01" }],
                _highlight: true,
              },
            ],
          },
        ],
      },
    ],
    [
      "should mark the bricks with sub-routes",
      {
        routeList: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [],
          },
          {
            id: "R-02",
            type: "routes",
            path: "/b/c",
            parent: [{ id: "B-01" }],
            mountPoint: "m1",
          },
        ],
        brickList: [
          {
            id: "B-01",
            type: "brick",
            brick: "container-brick.a",
            parent: [{ id: "R-01" }],
          },
        ],
        root: "R-01",
      },
      {
        list: [
          {
            id: "R-01",
            path: "/a",
            type: "bricks",
            parent: [],
            children: [
              {
                id: "B-01",
                type: "brick",
                brick: "container-brick.a",
                alias: "a",
                _hasView: true,
                parent: [{ id: "R-01" }],
                children: [
                  {
                    id: "R-02",
                    type: "routes",
                    path: "/b/c",
                    parent: [{ id: "B-01" }],
                    mountPoint: "m1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  ])("BuilderGraphData(%j) should work", async (condition, params, result) => {
    expect(await BuilderGraphData(params)).toEqual(result);
  });
});
