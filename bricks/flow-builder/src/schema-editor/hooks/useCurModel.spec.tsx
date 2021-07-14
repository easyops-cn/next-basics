import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { handleHttpError } from "@next-core/brick-kit";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-core/brick-kit");

import { useCurModel } from "./useCurModel";

function TestComponent(props: any): React.ReactElement {
  const [{ modelData }] = useCurModel(props.model);
  return <div>{JSON.stringify(modelData)}</div>;
}

describe("hook test", () => {
  it("useContractModels", async () => {
    (InstanceApi_postSearch as jest.Mock).mockResolvedValue({
      list: [{ name: "FlowData", namespaceId: "api.easyops.FlowData" }],
    });
    const wrapper = mount(<TestComponent model="FlowData" />);

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.text()).toEqual(
      '{"name":"FlowData","namespaceId":"api.easyops.FlowData"}'
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
