import { getRequestExampleOfYaml } from "./getRequestExampleOfYaml";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getRequestOfYaml", () => {
  it.each([
    [
      {
        endpoint: {
          uri: "api/cmdb/list",
          method: "GET",
        },
        examples: [
          {
            request: {
              uri: "https://192.168.100.162/api/cmdb/list",
              body: '{\n "instanceId": "instance_id",\n "name": "string",\n "businesses": "instance_id[]",\n "metric": "string",\n "order": "string",\n "from": "string",\n "to": "string",\n "step": "string",\n "page": "page",\n "pageSize": "page_size"\n}',
            },
          },
          {
            request: {
              uri: "https://192.168.100.163/api/cmdb/list",
              body: '{\n  "page": 1,\n  "pageSize": 20\n}',
            },
          },
        ],
      },
      {
        request: {
          uri: "https://192.168.100.163/api/cmdb/list",
          body: '{\n  "page": 1,\n  "pageSize": 20\n}',
        },
      },
      "- page: 1\n  pageSize: 20\n",
    ],
    [
      {
        endpoint: {
          uri: "api/cmdb/:object/:instanceId",
          method: "POST",
        },
        examples: [
          {
            request: {
              uri: "https://192.168.100.162/api/cmdb/APP/abcd?onlyMe=1",
              body: '{\n  "page": 1,\n  "pageSize": 20,\n  "fields": {\n    "name": true\n  },\n  "query": {\n    "name": {\n      "$like": "%%"\n    }\n  }\n}',
            },
          },
          {
            request: {
              uri: "https://192.168.100.162/api/cmdb/HOST/a2da",
              body: "",
            },
          },
        ],
      },
      {
        request: {
          uri: "https://192.168.100.162/api/cmdb/APP/abcd?onlyMe=1",
          body: '{\n  "page": 1,\n  "pageSize": 20,\n  "fields": {\n    "name": true\n  },\n  "query": {\n    "name": {\n      "$like": "%%"\n    }\n  }\n}',
        },
      },
      "- APP\n- abcd\n- page: 1\n  pageSize: 20\n  fields:\n    name: true\n  query:\n    name:\n      $like: '%%'\n- onlyMe: '1'\n",
    ],
    [
      {
        endpoint: {
          uri: "api/list",
          method: "GET",
        },
        examples: [],
      },
      {
        request: {
          uri: "not/match/api",
        },
      },
      "[]\n",
    ],
  ])("should work", (contractData, curExample, result) => {
    expect(getRequestExampleOfYaml(contractData, curExample)).toEqual(result);
  });
});
