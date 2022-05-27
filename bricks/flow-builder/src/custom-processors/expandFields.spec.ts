import { expandFields } from "./expandFields";
import { Field } from "./interfaces";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("expandFields", () => {
  const circularFields: Field[] = [
    {
      name: "fields",
      type: "ContractField[]",
    },
  ];
  circularFields[0].__fields__ = circularFields;
  it.each([
    [
      {
        name: "request",
        ref: "FlowData.*",
      },
      [
        {
          name: "FlowData",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "age",
              type: "int",
            },
          ],
        },
      ],
      {
        name: "request",
        ref: "FlowData.*",
        __fields__: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "age",
            type: "int",
          },
        ],
      },
    ],
    [
      {
        name: "request",
        type: "object",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "data",
            type: "PluginData[]",
          },
        ],
      },
      [
        {
          name: "PluginData",
          fields: [
            {
              name: "id",
              type: "string",
            },
          ],
        },
      ],
      {
        name: "request",
        type: "object",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "data",
            type: "PluginData[]",
            __fields__: [
              {
                name: "id",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
    [
      {
        name: "request",
        type: "object",
        fields: [
          {
            ref: "PluginData.name",
          },
        ],
      },
      [
        {
          name: "PluginData",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "id",
              type: "string",
            },
          ],
        },
      ],
      {
        name: "request",
        type: "object",
        fields: [
          {
            ref: "PluginData.name",
            __fields__: [
              {
                name: "name",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
    [
      {
        name: "examples",
        type: "object[]",
        fields: [
          {
            name: "fields",
            type: "ContractField[]",
          },
        ],
      },
      [
        {
          name: "ContractField",
          fields: [
            {
              name: "fields",
              type: "ContractField[]",
            },
          ],
        },
      ],
      {
        name: "examples",
        type: "object[]",
        fields: [
          {
            name: "fields",
            type: "ContractField[]",
            __fields__: circularFields,
          },
        ],
      },
    ],
    [undefined, [], undefined],
  ])("should work", (field, definitionList, result) => {
    expect(expandFields(field, definitionList)).toEqual(result);
  });
});
