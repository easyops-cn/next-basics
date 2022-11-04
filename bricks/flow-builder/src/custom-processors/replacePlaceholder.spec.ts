import { replacePlaceholder } from "./replacePlaceholder";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("replacePlaceholder", () => {
  it.each([
    [
      { name: "easyops", age: 11 },
      { name: "{{name}}", age: "{{age}}" },
      undefined,
      { name: "easyops", age: 11 },
    ],
    [
      undefined,
      { name: "{{name}}", age: "{{age}}" },
      undefined,
      { name: "{{name}}", age: "{{age}}" },
    ],
    [
      { service: { name: "cmdb", host: "192.168.100.163" } },
      "{{service}}",
      undefined,
      { name: "cmdb", host: "192.168.100.163" },
    ],
    [{ service: { name: "cmdb", host: "192.168.100.163" } }, "", undefined, ""],
    [{ service: { name: "cmdb", host: "192.168.100.163" } }, 5, undefined, 5],
    [
      { service: { name: "cmdb", host: "192.168.100.163" } },
      {
        name: "tester",
        data: {
          service: "{{service}}",
        },
      },
      undefined,
      {
        data: { service: { host: "192.168.100.163", name: "cmdb" } },
        name: "tester",
      },
    ],
    [
      { service: { name: "cmdb", host: "192.168.100.163" } },
      {
        name: "tester",
        list: [
          {
            service: "{{service}}",
          },
        ],
      },
      undefined,
      {
        list: [{ service: { host: "192.168.100.163", name: "cmdb" } }],
        name: "tester",
      },
    ],
  ])("should work", (contextData, placeholderRaw, placeholderFn, result) => {
    expect(
      replacePlaceholder(contextData, placeholderRaw, placeholderFn)
    ).toEqual(result);
  });
});
