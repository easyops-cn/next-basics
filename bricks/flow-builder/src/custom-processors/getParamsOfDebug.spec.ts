import { getParamsOfDebug } from "./getParamsOfDebug";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getParamsOfDebug", () => {
  it.each([
    [
      {
        examples: [],
        endpoint: {
          uri: "api/cmdb",
          method: "LIST",
        },
      },
      [
        {
          name: "test",
        },
      ],
      { method: "GET", uri: "api/cmdb?name=test" },
    ],
    [
      {
        examples: [],
        endpoint: {
          uri: "api/cmdb",
          method: "LIST",
        },
      },
      undefined,
      { method: "GET", uri: "api/cmdb" },
    ],
    [
      {
        examples: [],
        endpoint: {
          uri: "api/cmdb",
          method: "DELETE",
        },
      },
      [
        {
          instanceId: "test",
        },
      ],
      { method: "DELETE", uri: "api/cmdb?instanceId=test" },
    ],
    [
      {
        examples: [],
        endpoint: {
          uri: "api/list",
          method: "POST",
        },
      },
      [
        {
          objectId: "APP",
        },
      ],
      { method: "POST", uri: "api/list", data: { objectId: "APP" } },
    ],
    [
      {
        examples: [],
        endpoint: {
          uri: "api/:objectId/:instanceId",
          method: "POST",
          ext_fields: [
            {
              name: "instance",
              source: "data",
            },
          ],
        },
      },
      [
        "HOST",
        "abc",
        {
          instance: {
            name: "test",
          },
        },
      ],
      {
        method: "POST",
        uri: "api/HOST/abc",
        data: { instance: { name: "test" } },
      },
    ],
    [
      {
        examples: [],
        endpoint: {
          uri: "api/:objectId/:instanceId",
          method: "POST",
          ext_fields: [
            {
              name: "onlyMe",
              source: "query",
            },
          ],
        },
      },
      [
        "HOST",
        "abc",
        {
          onlyMe: true,
        },
      ],
      {
        method: "POST",
        uri: "api/HOST/abc?onlyMe=true",
        data: undefined,
      },
    ],
    [
      {
        examples: [],
        endpoint: {
          uri: "api/:objectId/:instanceId",
          method: "POST",
          ext_fields: [
            {
              name: "onlyMe",
              source: "query",
            },
            {
              name: "data",
              source: "body",
            },
          ],
        },
      },
      [
        "HOST",
        "abc",
        {
          name: "test",
        },
        {
          onlyMe: true,
          isShow: true,
        },
      ],
      {
        method: "POST",
        uri: "api/HOST/abc?onlyMe=true&isShow=true",
        data: { name: "test" },
      },
    ],
  ])("should work", (contract, args, result) => {
    expect(getParamsOfDebug(contract, args)).toEqual(result);
  });
});
