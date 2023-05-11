import React from "react";
import {
  UserOrUserGroupSelect,
  UserSelectFormItem,
} from "./UserOrUserGroupSelect";
import { act } from "@testing-library/react";
import {
  InstanceApi_postSearch,
  CmdbObjectApi_getObjectRef,
} from "@next-sdk/cmdb-sdk";
import { mount } from "enzyme";
import { Select, Button } from "antd";
import { InstanceListModal } from "@next-libs/cmdb-instances";
import * as brickKit from "@next-core/brick-kit";
jest.spyOn(brickKit, "getAuth").mockReturnValue({
  username: "tester",
});
const mockPostSearch = InstanceApi_postSearch as jest.Mock;
jest.mock("@next-sdk/cmdb-sdk");

jest.mock("@next-libs/cmdb-instances", () => ({
  InstanceListModal: jest.fn(() => {
    return "<div>Fake instance list modal loaded!</div>";
  }),
}));

describe("UserOrUserGroupSelect", () => {
  it("should work", async () => {
    mockPostSearch.mockResolvedValue({
      list: [
        {
          instanceId: "instanceId",
          name: "easyops",
          nickname: "uwin",
        },
      ],
    });
    const onChange = jest.fn();

    const wrapper = mount(
      <UserOrUserGroupSelect
        isMultiple={true}
        onChange={onChange}
        objectList={[
          {
            objectId: "USER",
            view: {
              show_key: ["name", "nickname"],
            },
          },
          {
            objectId: "USER_GROUP",
            view: {
              show_key: ["name"],
            },
          },
        ]}
        value={{
          selectedUser: ["easyops"],
        }}
      />
    );

    await (global as any).flushPromises();
    wrapper.find(Select).invoke("onChange")(
      [{ key: "easyops1", label: "easyops(uwin1)" }],
      null
    );

    expect(wrapper.find(Select).prop("value")).toEqual([
      { key: "easyops1", label: "easyops(uwin1)" },
    ]);

    wrapper.setProps({
      value: {
        selectedUser: ["easyops"],
      },
    });

    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      {
        key: "easyops",
        label: "easyops(uwin)",
      },
    ]);

    wrapper.find(Select).invoke("onChange")([], null);
    await (global as any).flushPromises();
    expect(onChange).toBeCalledWith(null);
  });
  it("should work showkey's attribute value of UserOrGroup is null", async () => {
    mockPostSearch.mockResolvedValue({
      list: [
        {
          instanceId: "instanceId",
          name: "easyopstest",
        },
      ],
    });
    const onChange = jest.fn();
    const wrapper = mount(
      <UserOrUserGroupSelect
        isMultiple={true}
        onChange={onChange}
        objectList={[
          {
            objectId: "USER",
            view: {
              show_key: ["test"],
            },
          },
          {
            objectId: "USER_GROUP",
            view: {
              show_key: ["name"],
            },
          },
        ]}
        value={{
          selectedUser: ["easyopstest"],
        }}
      />
    );
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      {
        key: "easyopstest",
        label: "easyopstest",
      },
    ]);
  });
  it("should work and query", async () => {
    mockPostSearch.mockResolvedValue({
      list: [
        {
          instanceId: "59eea4ad40bf8",
          name: "easyops",
          nickname: "uwin",
        },
        {
          instanceId: "59eea4ad40bw2",
          name: "test",
          nickname: "xxx",
        },
      ],
    });
    (CmdbObjectApi_getObjectRef as jest.Mock).mockResolvedValue({
      data: [
        {
          objectId: "USER",
          view: {
            show_key: ["name", "nickname"],
          },
        },
        {
          objectId: "USER_GROUP",
          view: {
            show_key: ["name"],
          },
        },
      ],
    });
    const onChange = jest.fn();

    const wrapper = mount(
      <UserOrUserGroupSelect
        onChange={onChange}
        optionsMode="user"
        query={{
          instanceId: { $in: ["59eea4ad40bf8", "59eea4ad40bw2"] },
        }}
        staticList={["easyops"]}
        isMultiple={true}
      />
    );
    await (global as any).flushPromises();
    wrapper.update();
    wrapper.find(Select).invoke("onChange")(
      {
        key: "test",
        label: "test(xxx)",
      },
      null
    );
    expect(wrapper.find(Select).prop("value")).toEqual(["test", "test(xxx)"]);
    wrapper.setProps({
      optionsMode: "group",
    });
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(UserSelectFormItem).prop("optionsMode")).toEqual(
      "group"
    );
  });

  it("should work is not multiple", async () => {
    mockPostSearch.mockResolvedValue({
      list: [
        {
          instanceId: "instanceId",
          name: "easyops",
          nickname: "uwin",
        },
      ],
    });
    const onChange = jest.fn();

    const wrapper = mount(
      <UserOrUserGroupSelect
        isMultiple={false}
        onChange={onChange}
        optionsMode={"all"}
        objectList={[
          {
            objectId: "USER",
            view: {
              show_key: ["name", "nickname"],
            },
          },
          {
            objectId: "USER_GROUP",
            view: {
              show_key: ["name"],
            },
          },
        ]}
        value={{
          selectedUser: ["easyops"],
        }}
      />
    );

    await (global as any).flushPromises();
    wrapper.find(Select).invoke("onChange")(
      { key: "easyops1", label: "easyops(uwin1)" },
      null
    );

    expect(wrapper.find(Select).prop("value")).toEqual([
      { key: "easyops1", label: "easyops(uwin1)" },
    ]);

    wrapper.setProps({
      value: {
        selectedUser: ["easyops"],
      },
    });

    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      {
        key: "easyops",
        label: "easyops(uwin)",
      },
    ]);

    expect(wrapper.find(InstanceListModal).length).toBe(1);
    mockPostSearch
      .mockResolvedValueOnce({
        list: [
          {
            instanceId: "5dd38c53b9c25",
            name: "easyops2",
            nickname: "uwin2",
          },
        ],
      })
      .mockResolvedValueOnce({
        list: [
          {
            instanceId: "5dd38c53b9c26",
            name: "tester",
            nickname: "tester",
          },
        ],
      });
    wrapper.find(InstanceListModal).at(0).invoke("onSelected")([
      "5dd38c53b9c25",
    ]);
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      { key: "easyops2", label: "easyops2(uwin2)" },
    ]);

    wrapper.find(Select).invoke("onChange")(undefined, null);
    await (global as any).flushPromises();
    expect(onChange).toBeCalledWith(null);

    expect(wrapper.find(Button).length).toBe(2);
    mockPostSearch.mockClear();
    wrapper.find(Button).at(0).invoke("onClick")();
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      { key: "tester", label: "tester(tester)" },
    ]);
    expect(mockPostSearch).toBeCalledTimes(1);
    wrapper.find(Button).at(0).invoke("onClick")();
    expect(mockPostSearch).toBeCalledTimes(1);
  });
});
