import { ContextConf } from "@next-core/brick-types";
import {
  filterOptions,
  OptionType,
  safeDumpFields,
  safeLoadFields,
  computeItemToSubmit,
  ContextItemFormValue,
} from "./utils";

describe("filterOptions", () => {
  it.each<[string, { value: string; options: OptionType[] }, OptionType[]]>([
    [
      "should work",
      {
        value: "next-builder",
        options: [
          {
            label: "next-builder.get-list",
            value: "next-builder.get-list",
          },
          {
            label: "packages.get-list",
            value: "packages.get-list",
          },
          {
            label: "next-builder.get-detail",
            value: "next-builder.get-detail",
          },
        ],
      },
      [
        {
          label: "next-builder.get-list",
          value: "next-builder.get-list",
        },
        {
          label: "next-builder.get-detail",
          value: "next-builder.get-detail",
        },
      ],
    ],
    [
      "should work with upper case word",
      {
        value: "Next-Builder",
        options: [
          {
            label: "next-builder.get-list",
            value: "next-builder.get-list",
          },
          {
            label: "packages.get-list",
            value: "packages.get-list",
          },
        ],
      },
      [
        {
          label: "next-builder.get-list",
          value: "next-builder.get-list",
        },
      ],
    ],
    [
      "should be empty when not match",
      {
        value: "CI",
        options: [
          {
            label: "next-builder.get-list",
            value: "next-builder.get-list",
          },
        ],
      },
      [],
    ],
  ])("filterOptions(%j) should work", async (condition, params, result) => {
    expect(filterOptions(params.value, params.options)).toEqual(result);
  });
});

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
  it.each<[string, ContextItemFormValue, ContextConf]>([
    [
      "should work when type is value",
      {
        type: "value",
        value: "age: 18",
        name: "userInfo",
      },
      {
        name: "userInfo",
        value: {
          age: 18,
        },
      },
    ],
    [
      "should work when type is resolve",
      {
        type: "resolve",
        useProvider: "provider-a",
        if: "<% QUERY.q %>",
        args: "- P-1",
        transform: "value: <% DATA %>\n",
        name: "new",
      },
      {
        name: "new",
        resolve: {
          useProvider: "provider-a",
          if: "<% QUERY.q %>",
          args: ["P-1"],
          transform: {
            value: "<% DATA %>",
          },
        },
      },
    ],
  ])(
    "computeItemToSubmit(%j) should work",
    async (condition, params, result) => {
      expect(computeItemToSubmit(params)).toEqual(result);
    }
  );
});
