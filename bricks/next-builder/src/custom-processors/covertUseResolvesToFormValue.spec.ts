import { covertUseResolvesToFormValue } from "./covertUseResolvesToFormValue";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("covertUseResolvesToFormValue", () => {
  it.each([
    [
      {
        useProvider: "api.cmdb.provider",
        args: ["anc"],
        transform: "@{}",
      },
      {
        args: "- anc\n",
        handlerType: "useProvider",
        provider: "api.cmdb.provider",
        providerType: "provider",
        transform: "'@{}'\n",
      },
    ],
    [
      {
        if: "<% CTX.if %>",
        useProvider: "my@getDetail:1.0.0",
        transform: "@{}",
        transformFrom: "list",
      },
      {
        flow: "my@getDetail:1.0.0",
        handlerType: "useProvider",
        if: "<% CTX.if %>\n",
        providerType: "flow",
        transform: "'@{}'\n",
        transformFrom: "list\n",
      },
    ],
  ])("should work", (resolveData, result) => {
    expect(covertUseResolvesToFormValue(resolveData)).toEqual(result);
  });
});
