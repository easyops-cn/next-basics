import { HttpProxy, HttpProxyParams } from "./HttpProxy";
import { http } from "@next-core/brick-http";

jest.mock("@next-core/brick-http");
jest.spyOn(http, "request").mockResolvedValue({});

describe("HttpProxy", () => {
  it.each<[HttpProxyParams, any]>([
    [
      {
        serviceName: "fake.serveice",
        api: "api/v1/faker/create",
        method: "get",
      },
      {},
    ],
    [
      {
        serviceName: "fake.serveice",
        api: "api/v1/faker/create",
        method: "post",
        params: {
          page: 1,
          pageSize: 10,
        },
        body: {
          name: "test",
          value: "",
        },
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "cache",
        },
      },
      {},
    ],
    [
      {
        serviceName: "fake.serveice",
        api: "api/v1/faker/create",
        method: "get",
        body: "name=1",
      },
      {},
    ],
    [
      {
        origin: "http://localhost:8080",
        api: "api/v1/user",
        method: "get",
      },
      {},
    ],
  ])("HttpProxy(%j) should work", async (params, result) => {
    expect(await HttpProxy(params)).toEqual(result);
  });
});
