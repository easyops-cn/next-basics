import { searchList } from "./utils";

interface OptionType {
  value: string;
  label: string;
}

describe("searchList", () => {
  it.each<
    [
      string,
      { value: string; options: OptionType[]; field?: string },
      OptionType[]
    ]
  >([
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
        value: "CI",
        options: [
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
        value: "",
        options: [
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
  ])("searchList(%j) should work", async (condition, params, result) => {
    expect(searchList(params.options, params.value, params.field)).toEqual(
      result
    );
  });
});