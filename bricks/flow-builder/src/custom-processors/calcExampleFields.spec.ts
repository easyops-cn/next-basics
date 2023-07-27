import { calcExampleFields } from "./calcExampleFields";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("calcExampleFields", () => {
  it.each([
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
            name: "age",
            ref: "USER.age",
            __fields__: [
              {
                name: "age",
                type: "int",
              },
            ],
          },
          {
            name: "ids",
            type: "string[]",
          },
          {
            name: "instance",
            type: "InstanceData[]",
            __fields__: [
              {
                name: "instanceId",
                type: "string",
              },
            ],
          },
          {
            name: "filter",
            type: "Filter",
            __fields__: [
              {
                name: "time",
                type: "string",
              },
            ],
          },
          {
            name: "fields",
            type: "FieldContract[]",
            __fields__: [
              {
                name: "name",
                type: "string",
              },
              {
                name: "fields",
                type: "FieldContract[]",
                __fields__: [
                  {
                    name: "name",
                    type: "string",
                  },
                  {
                    name: "fields",
                    type: "FieldContract[]",
                  },
                ],
              },
            ],
          },
          {
            name: "data",
            type: "object",
            fields: [
              {
                name: "instanceId",
                type: "string",
              },
              {
                name: "isEdit",
                type: "boolean",
              },
            ],
          },
          {
            name: "notify",
            type: "object[]",
            fields: [
              {
                name: "time",
                type: "string",
              },
            ],
          },
        ],
      },
      {
        age: "int",
        data: { instanceId: "string", isEdit: "boolean" },
        instance: [
          {
            instanceId: "string",
          },
        ],
        filter: {
          time: "string",
        },
        fields: [
          {
            name: "string",
            fields: ["FieldContract"],
          },
        ],
        ids: ["string"],
        name: "string",
        notify: [{ time: "string" }],
      },
    ],
    [
      {
        name: "request",
        type: "InstanceData",
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
      {
        name: "string",
        age: "int",
      },
    ],
    [
      {
        name: "request",
        type: "object",
      },
      {},
    ],
  ])("should work", (fields, result) => {
    expect(calcExampleFields(fields)).toEqual(result);
  });
});
