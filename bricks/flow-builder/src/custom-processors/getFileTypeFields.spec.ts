import { getFileTypeFields } from "./getFileTypeFields";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getFileTypeField", () => {
  it.each([
    [
      {
        name: "request",
        type: "object",
        fields: [
          {
            name: "file",
            type: "file",
          },
        ],
      },
      [
        {
          name: "file",
          type: "file",
        },
      ],
    ],
    [
      {
        name: "request",
        type: "object",
        fields: [
          {
            ref: "Plugin.*",
            __fields__: [
              {
                name: "name",
                type: "string",
              },
              {
                name: "file",
                type: "file[]",
              },
            ],
          },
        ],
      },
      [
        {
          name: "file",
          type: "file[]",
        },
      ],
    ],
    [
      {
        name: "request",
        type: "object",
        fields: [
          {
            name: "data",
            type: "Plugin[]",
            __fields__: [
              {
                name: "name",
                type: "string",
              },
              {
                name: "file",
                type: "file[]",
              },
            ],
          },
        ],
      },
      [
        {
          name: "file",
          type: "file[]",
        },
      ],
    ],
    [
      {
        name: "request",
        type: "object",
        fields: [
          {
            name: "data",
            type: "Plugin[]",
            __fields__: [
              {
                name: "name",
                type: "string",
              },
              {
                name: "file",
                type: "file[]",
              },
              {
                name: "field",
                type: "ContractField[]",
                __fields__: [
                  {
                    name: "field",
                    type: "ContractField[]",
                    __fields__: [
                      {
                        name: "field",
                        type: "ContractField[]",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      [
        {
          name: "file",
          type: "file[]",
        },
      ],
    ],
    [undefined, []],
  ])("should work", (field, result) => {
    expect(getFileTypeFields(field)).toEqual(result);
  });
});
