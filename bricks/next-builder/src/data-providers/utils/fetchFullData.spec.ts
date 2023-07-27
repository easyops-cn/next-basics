import { fetchFullData } from "./fetchFullData";
import { InstanceApi_postSearchV3 } from "@next-sdk/cmdb-sdk";

jest.mock("@next-sdk/cmdb-sdk");

describe("fetchFullData", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("case 1", async () => {
    (InstanceApi_postSearchV3 as jest.Mock).mockImplementation((_, params) => {
      if (params.page === 1) {
        return {
          list: new Array(3000).fill(1),
          total: 3020,
        };
      } else if (params.page === 2) {
        return {
          list: new Array(20).fill(1),
          total: 3020,
        };
      }
    });
    const result = await fetchFullData("HOST", {
      fields: ["id"],
    });

    expect(result.list.length).toBe(3020);
    expect(InstanceApi_postSearchV3).toBeCalledTimes(2);
  });

  it("case 2", async () => {
    (InstanceApi_postSearchV3 as jest.Mock).mockImplementation((_, params) => {
      if (params.page <= 3) {
        return {
          list: new Array(3000).fill(1),
          total: 10010,
        };
      } else if (params.page > 3) {
        return {
          list: new Array(1010).fill(1),
          total: 10010,
        };
      }
    });
    const result = await fetchFullData("HOST", {
      fields: ["id"],
    });

    expect(result.list.length).toBe(10010);
    expect(InstanceApi_postSearchV3).toBeCalledTimes(4);
  });

  it("case 3", async () => {
    (InstanceApi_postSearchV3 as jest.Mock).mockImplementation(() => {
      return {
        list: new Array(100).fill(1),
        total: 100,
      };
    });
    const result = await fetchFullData("HOST", {
      fields: ["id"],
    });

    expect(result.list.length).toBe(100);
    expect(InstanceApi_postSearchV3).toBeCalledTimes(1);
  });
});
