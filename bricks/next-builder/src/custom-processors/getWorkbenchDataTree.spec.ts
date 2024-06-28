import _ from "lodash";
import { BuilderRouteNode } from "@next-core/brick-types";
import { getWorkbenchDataTree } from "./getWorkbenchDataTree";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

jest.spyOn(_, "uniqueId").mockImplementation((prefix) => `${prefix ?? ""}0`);

test("getWorkbenchDataTree for route", () => {
  const tree = getWorkbenchDataTree({
    type: "bricks",
    context: [
      {
        name: "a",
        value: "1",
      },
      {
        name: "b",
        resolve: {},
        if: "<% false %>",
      },
      {
        name: "c",
        resolve: {},
        if: "<% !FLAGS['disabled'] %>",
      },
      {
        name: "e",
        value: [{ a: true }, { b: 234224, c: null }],
      },
      {
        name: "f",
        value: undefined,
      },
    ],
  } as BuilderRouteNode);
  expect(tree).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": Object {
          "$key": "context-key-0",
          "name": "a",
          "value": "1",
        },
        "icon": Object {
          "color": "blue",
          "icon": "dollar-sign",
          "lib": "fa",
          "prefix": "fas",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "a",
        "path": undefined,
        "unreachable": false,
      },
      Object {
        "data": Object {
          "$key": "context-key-0",
          "if": "<% false %>",
          "name": "b",
          "resolve": Object {},
        },
        "icon": Object {
          "color": "orange",
          "icon": "link",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "b",
        "path": undefined,
        "unreachable": true,
      },
      Object {
        "data": Object {
          "$key": "context-key-0",
          "if": "<% !FLAGS['disabled'] %>",
          "name": "c",
          "resolve": Object {},
        },
        "icon": Object {
          "color": "orange",
          "icon": "link",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "c",
        "path": undefined,
        "unreachable": false,
      },
      Object {
        "data": Object {
          "$key": "context-key-0",
          "name": "e",
          "value": Array [
            Object {
              "a": true,
            },
            Object {
              "b": 234224,
              "c": null,
            },
          ],
        },
        "icon": Object {
          "color": "blue",
          "icon": "dollar-sign",
          "lib": "fa",
          "prefix": "fas",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "e",
        "path": undefined,
        "unreachable": false,
      },
      Object {
        "data": Object {
          "$key": "context-key-0",
          "name": "f",
          "value": undefined,
        },
        "icon": Object {
          "color": "cyan",
          "icon": "code",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "f",
        "path": undefined,
        "unreachable": false,
      },
    ]
  `);
});

test("getWorkbenchDataTree for tpl", () => {
  const tree = getWorkbenchDataTree(
    {
      type: "custom-template",
      state: '[{"name":"a"},{"name":"b","expose":false}]',
    } as any,
    undefined,
    {
      distinguishExposedStates: true,
    }
  );
  expect(tree).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": Object {
          "$key": "context-key-0",
          "name": "a",
        },
        "icon": Object {
          "color": "cyan",
          "icon": "code",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "a",
        "path": undefined,
        "unreachable": false,
      },
      Object {
        "data": Object {
          "$key": "context-key-0",
          "expose": false,
          "name": "b",
        },
        "icon": Object {
          "color": "cyan",
          "icon": "code",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "context-key-0",
        "labelPrefix": Object {
          "style": Object {
            "color": "var(--palette-purple-7)",
          },
          "text": "# ",
        },
        "name": "b",
        "path": undefined,
        "unreachable": false,
      },
    ]
  `);
});

test("getWorkbenchDataTree for snippet", () => {
  const tree = getWorkbenchDataTree({
    type: "snippet",
    snippetData: [
      {
        name: "test",
        value: "hello",
      },
    ],
    snippetParams: {
      count: {
        type: "number",
        value: 1,
      },
    },
  } as any);

  expect(tree).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": Object {
          "$key": "context-key-0",
          "name": "test",
          "value": "hello",
        },
        "icon": Object {
          "color": "blue",
          "icon": "dollar-sign",
          "lib": "fa",
          "prefix": "fas",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "test",
        "path": undefined,
        "unreachable": false,
      },
    ]
  `);
});

test("getWorkbenchDataTree for theme-template snippet", () => {
  const tree = getWorkbenchDataTree(
    {
      type: "snippet",
      context: [
        {
          name: "test",
          value: "hello",
        },
      ],
    } as any,
    {
      storyboardType: "theme-template",
    }
  );

  expect(tree).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": Object {
          "$key": "context-key-0",
          "name": "test",
          "value": "hello",
        },
        "icon": Object {
          "color": "blue",
          "icon": "dollar-sign",
          "lib": "fa",
          "prefix": "fas",
        },
        "key": "context-key-0",
        "labelPrefix": undefined,
        "name": "test",
        "path": undefined,
        "unreachable": false,
      },
    ]
  `);
});

test("getWorkbenchDataTree for tpl with no state", () => {
  const tree = getWorkbenchDataTree({
    type: "custom-template",
    state: null,
  } as any);
  expect(tree).toEqual([]);
});
