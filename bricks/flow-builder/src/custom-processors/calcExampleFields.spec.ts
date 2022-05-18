import { calcExampleFields } from "./calcExampleFields";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("calcExampleFields", () => {
  it.each([
    [
      [
        {
          name: "name",
          type: "string",
        },
        {
          name: "age",
          ref: "USER.age",
        },
        {
          name: "ids",
          type: "string[]",
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
      {
        age: "USER.age",
        data: { instanceId: "string", isEdit: "boolean" },
        ids: ["string"],
        name: "string",
        notify: [{ time: "string" }],
      },
    ],
  ])("should work", (fields, result) => {
    expect(calcExampleFields(fields)).toEqual(result);
  });
});
