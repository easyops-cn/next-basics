import { BrickOptionItem } from "../interfaces";
import { searchBricks } from "./searchBricks";

jest.mock("../constants", () => ({
  brickSearchResultLimit: 20,
  frequentlyUsedBricks: [
    {
      type: "brick",
      name: "basic-bricks.micro-view",
    },
    {
      type: "brick",
      name: "basic-bricks.general-button",
    },
    {
      type: "brick",
      name: "forms.general-form",
    },
    {
      type: "brick",
      name: "forms.general-input",
    },
  ],
}));

const brickList: BrickOptionItem[] = [
  {
    type: "brick",
    name: "basic-bricks.micro-view",
  },
  {
    type: "brick",
    name: "basic-bricks.general-card",
  },
  {
    type: "brick",
    name: "forms.general-form",
  },
  {
    type: "brick",
    name: "forms.general-input",
  },
];

describe("searchBricks", () => {
  it("should show frequently used bricks by default", () => {
    const result = searchBricks(undefined, brickList);
    expect(result).toEqual([
      {
        scope: "basic-bricks",
        bricks: [
          {
            type: "brick",
            name: "basic-bricks.micro-view",
            scopeName: "basic-bricks",
            shortName: "micro-view",
          },
          {
            type: "brick",
            name: "basic-bricks.general-button",
            scopeName: "basic-bricks",
            shortName: "general-button",
          },
        ],
      },
      {
        scope: "forms",
        bricks: [
          {
            type: "brick",
            name: "forms.general-form",
            scopeName: "forms",
            shortName: "general-form",
          },
          {
            type: "brick",
            name: "forms.general-input",
            scopeName: "forms",
            shortName: "general-input",
          },
        ],
      },
    ]);
  });

  it("should show matched bricks with single keyword", () => {
    const result = searchBricks("general", brickList);
    expect(result).toEqual([
      {
        scope: "basic-bricks",
        bricks: [
          {
            type: "brick",
            name: "basic-bricks.general-card",
            scopeName: "basic-bricks",
            shortName: "general-card",
          },
        ],
      },
      {
        scope: "forms",
        bricks: [
          {
            type: "brick",
            name: "forms.general-form",
            scopeName: "forms",
            shortName: "general-form",
          },
          {
            type: "brick",
            name: "forms.general-input",
            scopeName: "forms",
            shortName: "general-input",
          },
        ],
      },
    ]);
  });

  it("should show matched bricks with multiple keywords", () => {
    const result = searchBricks(" general Form ", brickList);
    expect(result).toEqual([
      {
        scope: "forms",
        bricks: [
          {
            type: "brick",
            name: "forms.general-form",
            scopeName: "forms",
            shortName: "general-form",
          },
          {
            type: "brick",
            name: "forms.general-input",
            scopeName: "forms",
            shortName: "general-input",
          },
        ],
      },
    ]);
  });

  it("should show matched bricks with limit", () => {
    const result = searchBricks("general", brickList, 2);
    expect(result).toEqual([
      {
        scope: "basic-bricks",
        bricks: [
          {
            type: "brick",
            name: "basic-bricks.general-card",
            scopeName: "basic-bricks",
            shortName: "general-card",
          },
        ],
      },
      {
        scope: "forms",
        bricks: [
          {
            type: "brick",
            name: "forms.general-form",
            scopeName: "forms",
            shortName: "general-form",
          },
        ],
      },
    ]);
  });
});
