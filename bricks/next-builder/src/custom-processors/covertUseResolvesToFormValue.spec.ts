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
        transformMapArray: "auto",
      },
    ],
    [
      {
        useProvider: "api.cmdb.provider",
        args: ["anc"],
        transform: "@{}",
        transformMapArray: "auto",
      },
      {
        args: "- anc\n",
        handlerType: "useProvider",
        provider: "api.cmdb.provider",
        providerType: "provider",
        transform: "'@{}'\n",
        transformMapArray: "auto",
      },
    ],
    [
      {
        if: "<% CTX.if %>",
        useProvider: "my@getDetail:1.0.0",
        transform: "@{}",
        transformFrom: "list",
        transformMapArray: true,
      },
      {
        flow: "my@getDetail:1.0.0",
        handlerType: "useProvider",
        if: "<% CTX.if %>\n",
        providerType: "flow",
        transform: "'@{}'\n",
        transformFrom: "list\n",
        transformMapArray: true,
      },
    ],
    [
      {
        if: "<% CTX.if %>",
        useProvider: "my@getDetail:1.0.0",
        transform: "@{}",
        transformFrom: "list",
        transformMapArray: false,
      },
      {
        flow: "my@getDetail:1.0.0",
        handlerType: "useProvider",
        if: "<% CTX.if %>\n",
        providerType: "flow",
        transform: "'@{}'\n",
        transformFrom: "list\n",
        transformMapArray: false,
      },
    ],
  ])("should work", (resolveData, result) => {
    expect(covertUseResolvesToFormValue(resolveData)).toEqual(result);
  });
});
