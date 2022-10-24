import {
  BuilderCustomTemplateNode,
  BuilderRouteNode,
} from "@next-core/brick-types";
import { getWorkbenchDataTree } from "./getWorkbenchDataTree";
import _ from "lodash";

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
          "color": "cyan",
          "icon": "code",
          "lib": "antd",
          "theme": "outlined",
        },
        "key": "context-key-0",
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
        "name": "c",
        "path": undefined,
        "unreachable": false,
      },
    ]
  `);
});

test("getWorkbenchDataTree for tpl", () => {
  const tree = getWorkbenchDataTree({
    type: "custom-template",
    state: '[{"name":"a"}]',
  } as any);
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
        "name": "a",
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
