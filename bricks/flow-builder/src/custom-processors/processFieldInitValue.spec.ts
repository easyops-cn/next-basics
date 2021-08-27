import { processFieldInitValue } from "./processFieldInitValue";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("processFieldInitValue", () => {
  it.each([
    [{ name: "name" }, { name: "name", source: "const" }],
    [
      { name: "name", source: "const" },
      { name: "name", source: "const" },
    ],
    [
      { name: "name", value: "aaa" },
      { name: "name", source: "const", value: "aaa", constValue: "aaa" },
    ],
    [
      { name: "name", value: "aaa", source: "const" },
      { name: "name", source: "const", value: "aaa", constValue: "aaa" },
    ],
    [
      { name: "age", value: 18 },
      { name: "age", source: "const", value: 18, constValue: "18" },
    ],
    [
      { name: "isEdit", value: true },
      { name: "isEdit", source: "const", value: true, constValue: "true" },
    ],
    [
      { name: "name", value: "<% ddd %>" },
      { name: "name", source: "cel", value: "<% ddd %>", celValue: "ddd" },
    ],
    [
      { name: "name", value: "<% ddd %>", source: "cel" },
      { name: "name", source: "cel", value: "<% ddd %>", celValue: "ddd" },
    ],
    [
      { name: "name", value: "<% ddd %>", source: "fieldsMapping" },
      {
        name: "name",
        source: "fieldsMapping",
        value: "<% ddd %>",
        fieldsMappingValue: "ddd",
      },
    ],
    [
      { name: "hobby", value: { a: 3 } },
      { name: "hobby", source: "cel", value: { a: 3 }, celValue: "a: 3\n" },
    ],
  ])("should return %j", (field, result) => {
    expect(processFieldInitValue(field)).toEqual(result);
  });
});
