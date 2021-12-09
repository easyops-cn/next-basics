import { CmdbObjectApi_getDetail } from "@next-sdk/cmdb-sdk";
import { getBrickNodeAttrs } from "./getBrickNodeAttrs";

jest.mock("@next-sdk/cmdb-sdk");

(CmdbObjectApi_getDetail as jest.Mock).mockResolvedValue({
  attrList: [
    {
      id: "id",
    },
    {
      id: "type",
    },
    {
      id: "appId",
    },
    {
      id: "brick",
    },
  ],
});

describe("getBrickNodeAttrs", () => {
  it("should work", async () => {
    expect(await getBrickNodeAttrs()).toEqual(["type", "brick"]);
  });
});
