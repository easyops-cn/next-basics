import { renderHook } from "@testing-library/react-hooks";
import { useContract } from "./useContract";
import * as brickKit from "@next-core/brick-kit";
import { InstanceApi_postSearchV3 } from "@next-sdk/cmdb-sdk";

jest.mock("@next-sdk/cmdb-sdk");

describe("useContract", () => {
  it("should work", async () => {
    (InstanceApi_postSearchV3 as jest.Mock).mockImplementation(
      (objectId, data) =>
        Promise.resolve({
          list: [
            {
              name: "postSearch",
              version: "1.0.0",
              namespaceId: "cmdb.instance",
            },
            {
              name: "postSearchV2",
              version: "1.1.0",
              namespaceId: "cmdb.instance",
            },
            {
              name: "postSearchV3",
              version: "1.2.0",
              namespaceId: "cmdb.instance",
            },
          ].slice(0, data?.page_size),
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
      { name: "postSearch", namespaceId: "cmdb.instance", version: "1.0.0" },
      {
        name: "postSearchV2",
        version: "1.1.0",
        namespaceId: "cmdb.instance",
      },
      {
        name: "postSearchV3",
        version: "1.2.0",
        namespaceId: "cmdb.instance",
      },
    ]);

    rerender({ pageSize: 1 });

    await waitForNextUpdate();
    expect(result.current[0]).toEqual([
      { name: "postSearch", namespaceId: "cmdb.instance", version: "1.0.0" },
    ]);
    (InstanceApi_postSearchV3 as jest.Mock).mockClear();
  });

  it("provider return error", async () => {
    (InstanceApi_postSearchV3 as jest.Mock).mockRejectedValue(
      new Error("http error")
    );

    const spyOnHandleHttpError = jest.spyOn(brickKit, "handleHttpError");

    renderHook(() => useContract({}));

    await (global as any).flushPromises();
    expect(spyOnHandleHttpError).toHaveBeenCalled();
    (InstanceApi_postSearchV3 as jest.Mock).mockClear();
  });
});
