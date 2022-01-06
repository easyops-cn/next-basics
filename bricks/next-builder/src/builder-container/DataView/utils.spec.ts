import { ContextConf } from "@next-core/brick-types";
import {
  safeDumpFields,
  safeLoadFields,
  computeItemToSubmit,
  ContextItemFormValue,
  ContextType,
} from "./utils";

describe("safeDumpFields", () => {
  it.each<[string, Record<string, any>, Record<string, string>]>([
    [
      "should work",
      {
        args: ["args1"],
        if: false,
        transform: {
          value: "<% DATA %>",
        },
      },
      {
        args: "- args1\n",
        if: "false\n",
        transform: "value: <% DATA %>\n",
      },
    ],
  ])("safeDumpFields(%j) should work", async (condition, params, result) => {
    expect(safeDumpFields(params)).toEqual(result);
  });
});

describe("safeLoadFields", () => {
  it.each<[string, Record<string, string>, Record<string, any>]>([
    [
      "should work",
      {
        args: "- args1\n",
        if: "false\n",
        transform: "value: <% DATA %>\n",
      },
      {
        args: ["args1"],
        if: false,
        transform: {
          value: "<% DATA %>",
        },
      },
    ],
    [
      "should delete field with empty value",
      {
        args: "- args1\n",
        if: "false\n",
        transform: undefined,
      },
      {
        args: ["args1"],
        if: false,
      },
    ],
  ])("safeLoadFields(%j) should work", async (condition, params, result) => {
    expect(safeLoadFields(params)).toEqual(result);
  });
});

describe("computeItemToSubmit", () => {
  it.each<[string, ContextItemFormValue, ContextConf | Record<string, any>]>([
    [
      "should work when type is value",
      {
        type: ContextType.VALUE,
        value: "age: 18",
        name: "userInfo",
        onChange: 'target: "#id"\nproperties:\n  a: 1',
      },
      {
        name: "userInfo",
        value: {
          age: 18,
        },
        onChange: {
          target: "#id",
          properties: {
            a: 1,
          },
        },
      },
    ],
    [
      "should work when type is resolve of use-provider",
      {
        type: ContextType.RESOLVE,
        useProvider: "provider-a",
        value: "[]",
        if: "<% QUERY.q %>",
        resolveIf: "<% QUERY.page > 0 %>",
        args: "- P-1",
        transform: "value: <% DATA %>\n",
        name: "new",
        onChange: '- target: "#id"\n  properties:\n    a: 1',
        onReject: "transform:\n  value: <% DATA.message %>",
      },
      {
        value: [],
        if: "<% QUERY.q %>",
        name: "new",
        resolve: {
          useProvider: "provider-a",
          if: "<% QUERY.page > 0 %>",
          args: ["P-1"],
          transform: {
            value: "<% DATA %>",
          },
          onReject: {
            transform: {
              value: "<% DATA.message %>",
            },
          },
        },
        onChange: [
          {
            target: "#id",
            properties: {
              a: 1,
            },
          },
        ],
      },
    ],
    [
      "should work when type is value and value is error",
      {
        type: ContextType.VALUE,
        value: "- a: \nb",
        name: "userInfo",
      },
      {
        error: true,
        errorFields: {
          value: {
            help: "value is error",
            $$validateStatus: true,
          },
        },
      },
    ],
    [
      "should work when type is resolve of use-provider",
      {
        type: ContextType.RESOLVE,
        useProvider: "provider-a",
        value: "- a: \nb",
        resolveIf: "- a: \nb",
      },
      {
        error: true,
        errorFields: {
          value: {
            help: "value is error",
            $$validateStatus: true,
          },
          resolveIf: {
            help: "resolveIf is error",
            $$validateStatus: true,
          },
        },
      },
    ],
    [
      "should work when type is resolve of selector-provider",
      {
        type: ContextType.SELECTOR_RESOLVE,
        provider: "provider-b.\\get",
        if: "<% QUERY.q %>",
        resolveIf: "<% QUERY.page > 0 %>",
        args: "- P-1",
        transform: "value: <% DATA %>\n",
        name: "new",
        onChange: '- target: "#id"\n  properties:\n    a: 1',
      },
      {
        value: undefined,
        if: "<% QUERY.q %>",
        name: "new",
        resolve: {
          provider: "provider-b.\\get",
          if: "<% QUERY.page > 0 %>",
          args: ["P-1"],
          transform: {
            value: "<% DATA %>",
          },
        },
        onChange: [
          {
            target: "#id",
            properties: {
              a: 1,
            },
          },
        ],
      },
    ],
  ])("%s", async (condition, params, result) => {
    expect(computeItemToSubmit(params)).toEqual(result);
  });
});
