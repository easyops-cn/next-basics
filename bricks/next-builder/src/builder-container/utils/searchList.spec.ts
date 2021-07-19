import { searchList } from "./searchList";

describe("searchList", () => {
  const list = [
    {
      label: "get-list",
      value: "next-builder.get-list",
    },
    {
      label: "get-list",
      value: "packages.get-list",
    },
    {
      label: "get-detail",
      value: "NEXT-BUILDER.get-detail",
    },
  ];
  it.each<[string, { q: string; field: string }, any[]]>([
    [
      "should work with lower case query",
      {
        q: "next-builder",
        field: "value",
      },
      [
        {
          label: "get-list",
          value: "next-builder.get-list",
        },
        {
          label: "get-detail",
          value: "NEXT-BUILDER.get-detail",
        },
      ],
    ],
    [
      "should work with upper case query",
      {
        q: "Next-Builder",
        field: "value",
      },
      [
        {
          label: "get-list",
          value: "next-builder.get-list",
        },
        {
          label: "get-detail",
          value: "NEXT-BUILDER.get-detail",
        },
      ],
    ],
    [
      "should return full list with empty query",
      {
        q: " ",
        field: "value",
      },
      [
        {
          label: "get-list",
          value: "next-builder.get-list",
        },
        {
          label: "get-list",
          value: "packages.get-list",
        },
        {
          label: "get-detail",
          value: "NEXT-BUILDER.get-detail",
        },
      ],
    ],
  ])("%s", async (condition, params, result) => {
    expect(searchList(list, params.q, params.field)).toEqual(result);
  });
});
