import { processFieldsMaping } from "./processFieldsMaping";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("processFieldsMaping", () => {
  it.each([
    [
      [
        {
          name: "name",
          type: "string",
          source: "const",
          value: '"hello world"',
        },
        {
          name: "sort",
          type: "object",
          fields: [
            {
              name: "order",
              type: "int",
            },
            {
              name: "quey",
              type: "object[]",
              fields: [
                { name: "page", type: "int" },
                { name: "pageSize", type: "int" },
              ],
            },
          ],
        },
        {
          name: "pluginData",
          type: "object[]",
          fields: [
            { name: "instanceId", type: "string" },
            {
              name: "params",
              type: "object",
              fields: [{ name: "version", type: "string" }],
            },
          ],
        },
      ],
      [
        {
          description: undefined,
          disabledEdit: undefined,
          key: "0",
          name: "name",
          source: "const",
          type: "string",
          value: "hello world",
        },
        {
          description: undefined,
          disabledEdit: undefined,
          fields: [
            {
              description: undefined,
              disabledEdit: undefined,
              key: "1-0",
              name: "order",
              source: undefined,
              type: "int",
              value: undefined,
            },
            {
              description: undefined,
              disabledEdit: undefined,
              fields: [
                {
                  description: undefined,
                  disabledEdit: true,
                  key: "1-1-0",
                  name: "page",
                  source: undefined,
                  type: "int",
                  value: undefined,
                },
                {
                  description: undefined,
                  disabledEdit: true,
                  key: "1-1-1",
                  name: "pageSize",
                  source: undefined,
                  type: "int",
                  value: undefined,
                },
              ],
              key: "1-1",
              name: "quey",
              source: undefined,
              type: "object[]",
              value: undefined,
            },
          ],
          key: "1",
          name: "sort",
          source: undefined,
          type: "object",
          value: undefined,
        },
        {
          description: undefined,
          disabledEdit: undefined,
          fields: [
            {
              description: undefined,
              disabledEdit: true,
              key: "2-0",
              name: "instanceId",
              source: undefined,
              type: "string",
              value: undefined,
            },
            {
              description: undefined,
              disabledEdit: true,
              fields: [
                {
                  description: undefined,
                  disabledEdit: true,
                  key: "2-1-0",
                  name: "version",
                  source: undefined,
                  type: "string",
                  value: undefined,
                },
              ],
              key: "2-1",
              name: "params",
              source: undefined,
              type: "object",
              value: undefined,
            },
          ],
          key: "2",
          name: "pluginData",
          source: undefined,
          type: "object[]",
          value: undefined,
        },
      ],
    ],
  ])("should work %j", (data, result) => {
    expect(processFieldsMaping(data)).toEqual(result);
  });
});
