import { renderHook } from "@testing-library/react-hooks";
import { useContract } from "./useContract";
import { ContractCenterApi_searchContract } from "@next-sdk/next-builder-sdk";

jest.mock("@next-sdk/next-builder-sdk");

describe("useContract", () => {
  it("should work", async () => {
    (ContractCenterApi_searchContract as jest.Mock).mockImplementation((data) =>
      Promise.resolve({
        list: [
          {
            fullContractName: "cmdb.instance@postSearch",
            version: ["1.0.0"],
          },
          {
            name: "cmdb.instance@postSearchV2",
            version: ["1.1.0"],
          },
          {
            name: "cmdb.instance@postSearchV3",
            version: ["1.2.0"],
          },
        ].slice(0, data?.pageSize),
      })
    );

    const { result, waitForNextUpdate, rerender } = renderHook(
      (initialValue) => useContract(initialValue),
      {
        initialProps: {},
      }
    );

    await waitForNextUpdate();

    expect(result.current[0]).toEqual([
      {
        fullContractName: "cmdb.instance@postSearch",
        version: ["1.0.0"],
      },
      {
        name: "cmdb.instance@postSearchV2",
        version: ["1.1.0"],
      },
      {
        name: "cmdb.instance@postSearchV3",
        version: ["1.2.0"],
      },
    ]);

    rerender({ pageSize: 1 });

    await waitForNextUpdate();
    expect(result.current[0]).toEqual([
      {
        fullContractName: "cmdb.instance@postSearch",
        version: ["1.0.0"],
      },
    ]);
    (ContractCenterApi_searchContract as jest.Mock).mockClear();
  });

  it("provider return error", async () => {
    (ContractCenterApi_searchContract as jest.Mock).mockRejectedValue(
      new Error("http error")
    );

    const spyOnConsoleError = jest.spyOn(window.console, "error");

    renderHook(() => useContract({}));

    await (global as any).flushPromises();
    expect(spyOnConsoleError).toHaveBeenCalled();
    (ContractCenterApi_searchContract as jest.Mock).mockClear();
  });
});
