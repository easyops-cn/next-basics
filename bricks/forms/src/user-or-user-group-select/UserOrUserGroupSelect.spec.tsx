import React from "react";
import { UserOrUserGroupSelect } from "./UserOrUserGroupSelect";
import { act } from "@testing-library/react";
import { InstanceApi } from "@next-sdk/cmdb-sdk";
import { mount } from "enzyme";
import { Select } from "antd";

const mockPostSearch = InstanceApi.postSearch as jest.Mock;
jest.mock("@next-sdk/cmdb-sdk");
mockPostSearch.mockResolvedValue({
  list: [
    {
      instanceId: "instanceId",
      name: "easyops",
      nickname: "uwin"
    }
  ]
});

jest.mock("@next-libs/cmdb-instances", () => ({
  InstanceListModal: jest.fn(() => {
    return "<div>Fake instance list modal loaded!</div>";
  })
}));

describe("UserOrUserGroupSelect", () => {
  it("should work", async () => {
    const onChange = jest.fn();
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <UserOrUserGroupSelect
          onChange={onChange}
          objectMap={{
            USER: {
              view: {
                show_key: ["name", "nickname"]
              }
            },
            USER_GROUP: {
              view: {
                show_key: ["name"]
              }
            }
          }}
          value={{
            selectedUser: ["easyops"]
          }}
        />
      );
      await (global as any).flushPromises();
    });
    wrapper.find(Select).invoke("onChange")([
      { key: "easyops1", label: "easyops(uwin1)" }
    ]);
    expect(wrapper.find(Select).prop("value")).toEqual([
      { key: "easyops1", label: "easyops(uwin1)" }
    ]);
    await act(async () => {
      wrapper.setProps({
        value: {
          selectedUser: ["easyops"]
        }
      });
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      {
        key: "easyops",
        label: "easyops(uwin)"
      }
    ]);
    wrapper.find(Select).invoke("onChange")([]);
    await (global as any).flushPromises();
    expect(onChange).toBeCalledWith(null);
  });
});
