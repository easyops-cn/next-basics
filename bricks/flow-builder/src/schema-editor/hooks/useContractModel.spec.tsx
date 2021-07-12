import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { handleHttpError } from "@next-core/brick-kit";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-core/brick-kit");

import { useContractModels } from "./useContractModels";

function TestComponent(): React.ReactElement {
  const [{ modelList }] = useContractModels();
  return <div>{JSON.stringify(modelList)}</div>;
}

describe("hook test", () => {
  it("useContractModels", async () => {
    (InstanceApi_postSearch as jest.Mock).mockResolvedValue({
      list: [{ name: "Host", namespaceId: "api.easyops.host" }],
    });
    const wrapper = mount(<TestComponent />);

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.text()).toEqual(
      '[{"name":"Host","namespaceId":"api.easyops.host"}]'
    );
  });

  it("useContractModels with error", async () => {
    (InstanceApi_postSearch as jest.Mock).mockRejectedValue(new Error("error"));

    const wrapper = mount(<TestComponent />);
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(handleHttpError).toHaveBeenCalled();
  });
});
