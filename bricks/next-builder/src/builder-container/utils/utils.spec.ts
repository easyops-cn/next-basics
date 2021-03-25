import { searchList, findQueryInObjectValues } from "./utils";

describe("searchList", () => {
  it.each<[string, { q: string; list: any[]; field?: string }, any[]]>([
    [
      "should work",
      {
        q: "next-builder",
        list: [
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
        field: "label",
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
        q: "Next-Builder",
        list: [
          {
            label: "next-builder.get-list",
            value: "next-builder.get-list",
          },
          {
            label: "packages.get-list",
            value: "packages.get-list",
          },
        ],
        field: "label",
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
        q: "CI",
        list: [
          {
            label: "next-builder.get-list",
            value: "next-builder.get-list",
          },
        ],
        field: "label",
      },
      [],
    ],
    [
      "should return the whole list when value is empty",
      {
        q: "",
        list: [
          {
            label: "next-builder.get-list",
            value: "next-builder.get-list",
          },
        ],
        field: "label",
      },
      [
        {
          label: "next-builder.get-list",
          value: "next-builder.get-list",
        },
      ],
    ],
    [
      "should search object values",
      {
        q: "args1",
        list: [
          {
            name: "data-a",
            resolve: {
              useProvider: "provider-a",
              args: ["args1"],
              if: false,
              transform: {
                value: "<% DATA %>",
              },
            },
          },
          {
            name: "data-b",
            value: {
              id: 1,
            },
          },
        ],
      },
      [
        {
          name: "data-a",
          resolve: {
            useProvider: "provider-a",
            args: ["args1"],
            if: false,
            transform: {
              value: "<% DATA %>",
            },
          },
        },
      ],
    ],
    [
      "should search array item",
      {
        q: "a",
        list: [["a", "b"], ["c"]],
      },
      [["a", "b"]],
    ],
  ])("searchList(%j) should work", async (condition, params, result) => {
    expect(searchList(params.list, params.q, params.field)).toEqual(result);
  });
});

describe("findQueryInNode", () => {
  it.each<
    [
      string,
      { data: Record<string, any>; query: string; keys?: string[] },
      boolean
    ]
  >([
    [
      "should find brick",
      {
        data: {
          $$uid: 1,
          type: "brick",
          brick: "my-brick",
          id: "B-001",
          instanceId: "instance-a",
        },
        query: "my-brick",
      },
      true,
    ],
    [
      "should not find brick",
      {
        data: {
          $$uid: 1,
          type: "brick",
          brick: "my-brick",
          id: "B-001",
          instanceId: "instance-a",
        },
        query: "my-brick",
        keys: ["type"],
      },
      false,
    ],
  ])(
    "findQueryInObjectValues(%j) should work",
    async (condition, { data, query, keys }, found) => {
      expect(findQueryInObjectValues(data, query, keys)).toEqual(found);
    }
  );
});
