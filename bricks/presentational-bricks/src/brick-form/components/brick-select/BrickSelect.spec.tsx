import React from "react";
import { shallow, mount } from "enzyme";
import { LegacyBrickSelect } from "./BrickSelect";
import { InstanceApi } from "@next-sdk/cmdb-sdk";
import { act } from "react-dom/test-utils";

jest.mock("@next-sdk/cmdb-sdk");
const mockInstanceApiPostSearch = InstanceApi.postSearch as jest.Mock;
mockInstanceApiPostSearch.mockResolvedValue({ list: [] } as any);

describe("BrickSelect", () => {
  it("should work", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <LegacyBrickSelect
        optionList={[
          { text: "1", id: "1" },
          { text: "2", id: "2" },
        ]}
        onChange={onChange}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it("should trigger change event", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <LegacyBrickSelect
        optionList={[
          { text: "1", id: "1" },
          { text: "2", id: "2" },
        ]}
        onChange={onChange}
      />
    );
    wrapper.simulate("change");
    expect(onChange).toHaveBeenCalled();
  });

  it("searchInCmdb should work", async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <LegacyBrickSelect
        optionList={[
          { text: "1", id: "1" },
          { text: "2", id: "2" },
        ]}
        onChange={onChange}
        searchInCmdb={{
          pageSize: 10,
          objectId: "APP",
          attrFieldToDisplay: "name",
          attrFieldToSearch: "name",
        }}
      />
    );
    await act(async () => {
      await (global as any).flushPromises();
    })
    expect(wrapper.find("option").length).toBe(0);
  });
});
