import { HttpRequest, HttpRequestParams } from "./HttpRequest";
import { http } from "@next-core/brick-http";

jest.mock("@next-core/brick-http");
jest.spyOn(http, "request").mockResolvedValue({});

describe("HttpRequest", () => {
  it.each<[HttpRequestParams, any]>([
    [
      {
        url: "http://localhost:8081/next/api/gateway/cmdb.instance.PostSearchV3/v3/object/STORYBOARD_ROUTE/instance/_search",
        method: "POST",
        data: {
          fields: ["screenshot", "id"],
          query: {
            id: {
              $in: [
                "B-38535",
                "B-38550",
                "B-38477",
                "B-38566",
                "sB-34851",
                "B-34917",
              ],
            },
          },
        },
      },
      {},
    ],
  ])("HttpRequest(%j) should work", async (params, result) => {
    expect(await HttpRequest(params)).toEqual(result);
  });
});
