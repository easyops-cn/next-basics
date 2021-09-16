import { covertFormValueToUseResolves } from "./covertFormValueToUseResolves";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("covertFormValueToUseResolves", () => {
  it.each([
    [
      {
        providerType: "provider",
        provider: "api.cmdb.provider",
        args: "- abc",
        transform: "datasource: '@{}'",
      },
      {
        args: ["abc"],
        transform: { datasource: "@{}" },
        useProvider: "api.cmdb.provider",
      },
    ],
    [
      {
        providerType: "flow",
        flow: "namespace@getDetail:1.0.0",
        args: "- abc",
        transform: "datasource: '@{}'",
      },
      {
        args: ["abc"],
        transform: { datasource: "@{}" },
        useProvider: "namespace@getDetail:1.0.0",
      },
    ],
  ])("should work", (formValue, result) => {
    expect(covertFormValueToUseResolves(formValue)).toEqual(result);
  });
});
