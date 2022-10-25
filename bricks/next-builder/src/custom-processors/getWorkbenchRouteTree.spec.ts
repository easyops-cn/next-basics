import { getWorkbenchRouteTree } from "./getWorkbenchRouteTree";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

test("getWorkbenchRouteTree with empty tree", () => {
  const tree = getWorkbenchRouteTree([]);
  expect(tree).toEqual([]);
});

test("getWorkbenchRouteTree", () => {
  const tree = getWorkbenchRouteTree([
    {
      id: "r-1",
      path: "${APP.homepage}/1",
      type: "bricks",
    },
    {
      id: "r-2",
      alias: "Sub Routes",
      path: "${APP.homepage}/2",
      type: "routes",
    },
    {
      id: "r-2-a",
      path: "${APP.homepage}/2/a",
      type: "bricks",
      parent: [{ id: "r-2" }],
      if: "<% false %>",
    },
    {
      id: "r-2-b",
      path: "${APP.homepage}/2/b",
      type: "redirect",
      parent: [{ id: "r-2" }],
      if: "<% FLAGS['disabled'] %>",
    },
    {
      id: "r-0",
      path: "${APP.homepage}/ghost",
      type: "bricks",
      parent: [{ id: "r-ghost" }],
    },
  ]);
  expect(tree).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": undefined,
        "data": Object {
          "id": "r-1",
          "path": "\${APP.homepage}/1",
          "type": "bricks",
        },
        "icon": Object {
          "color": "var(--palette-blue-7)",
          "icon": "branches",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "r-1",
        "link": undefined,
        "name": "/1",
      },
      Object {
        "children": Array [
          Object {
            "children": undefined,
            "data": Object {
              "id": "r-2-a",
              "if": "<% false %>",
              "parent": Array [
                Object {
                  "id": "r-2",
                },
              ],
              "path": "\${APP.homepage}/2/a",
              "type": "bricks",
            },
            "icon": Object {
              "color": "var(--palette-blue-7)",
              "icon": "branches",
              "lib": "antd",
              "theme": "outlined",
            },
            "key": "r-2-a",
            "link": undefined,
            "name": "/2/a",
            "unreachable": true,
          },
          Object {
            "children": undefined,
            "data": Object {
              "id": "r-2-b",
              "if": "<% FLAGS['disabled'] %>",
              "parent": Array [
                Object {
                  "id": "r-2",
                },
              ],
              "path": "\${APP.homepage}/2/b",
              "type": "redirect",
            },
            "icon": Object {
              "color": "var(--palette-cyan-7)",
              "icon": "double-right",
              "lib": "antd",
              "theme": "outlined",
            },
            "key": "r-2-b",
            "link": undefined,
            "name": "/2/b",
          },
        ],
        "data": Object {
          "alias": "Sub Routes",
          "id": "r-2",
          "path": "\${APP.homepage}/2",
          "type": "routes",
        },
        "icon": Object {
          "color": undefined,
          "icon": "down",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "r-2",
        "link": undefined,
        "name": "Sub Routes",
      },
    ]
  `);
});

test("getWorkbenchRouteTree with link", () => {
  const tree = getWorkbenchRouteTree(
    [
      {
        id: "r-1",
        path: "${APP.homepage}/1",
        type: "bricks",
      },
    ],
    undefined,
    (id, type) => ({ to: `/type/${type}/id/${id}` })
  );
  expect(tree).toEqual([
    {
      key: "r-1",
      name: "/1",
      link: {
        to: "/type/bricks/id/r-1",
      },
      data: {
        id: "r-1",
        path: "${APP.homepage}/1",
        type: "bricks",
      },
      icon: {
        color: "var(--palette-blue-7)",
        icon: "branches",
        lib: "antd",
        theme: "outlined",
      },
    },
  ]);
});
