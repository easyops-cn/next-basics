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
import { PermissionApi_getPermissionList } from "@next-sdk/permission-sdk";
import * as brickKit from "@next-core/brick-kit";

jest.spyOn(brickKit, "getAuth").mockReturnValue({
  username: "tester",
});
jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/permission-sdk");
jest.mock("@next-libs/cmdb-instances", () => ({
  InstanceListModal: jest.fn(() => {
    return "<div>Fake instance list modal loaded!</div>";
  }),
}));

const mockPostSearch = InstanceApi_postSearch as jest.Mock;
const mockGetPermissionList = PermissionApi_getPermissionList as jest.Mock;

describe("UserOrUserGroupSelect", () => {
  it("should work", async () => {
    mockPostSearch.mockResolvedValue({
      list: [
        {
          instanceId: "instanceId",
          name: "easyops",
          nickname: "uwin",
        },
        {
          instanceId: "instanceId1",
          name: "tester",
          nickname: "test",
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
      {
        key: "tester",
        label: "tester(test)",
      },
    ]);

    wrapper.find(Select).invoke("onChange")([], null);
    await (global as any).flushPromises();
    expect(onChange).toBeCalledWith(null);

    wrapper.setProps({
      value: {
        selectedUser: ["easyops"],
      },
      staticList: ["tester"],
    });

    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toEqual([
      {
        key: "tester",
        label: (
          <div style={{ color: "var(--bg-color-button-link)" }}>
            tester(test)
          </div>
        ),
      },
      {
        key: "easyops",
        label: "easyops(uwin)",
      },
    ]);
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
        staticList={["easyops", ":59eea4ad40jbk"]}
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
    expect(CmdbObjectApi_getObjectRef as jest.Mock).toBeCalledTimes(1);
    wrapper.setProps({
      notRender: false,
    });
    await (global as any).flushPromises();
    wrapper.update();
    expect(CmdbObjectApi_getObjectRef as jest.Mock).toBeCalledTimes(1);
  });
  it("should work with filterPermissionActions", async () => {
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
    mockGetPermissionList.mockResolvedValue({
      code: 0,
      total: 1,
      page: 1,
      page_size: 1,
      data: [
        {
          id: "0123456789abc",
          org: 8888,
          system: "测试业务",
          action: "test_permission",
          remark: "测试权限",
          remark_translation: "测试权限",
          roles: ["系统管理员", "权限测试人员"],
          disable: false,
          user: ["easyops", "user1"],
          user_group: [":123456789abcd", ":23456789abcde"],
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
        filterPermissionActions={["test_permission"]}
      />
    );
    await (global as any).flushPromises();
    wrapper.update();
    wrapper.find(Select).invoke("onFocus")({} as React.FocusEvent<HTMLElement>);
    await (global as any).flushPromises();
    expect(mockGetPermissionList).toBeCalledWith({
      action__in: "test_permission",
      page_size: 1,
    });
    expect(mockPostSearch).toBeCalledWith(
      "USER",
      expect.objectContaining({
        query: {
          $and: expect.arrayContaining([
            {
              $or: [
                { name: { $in: ["easyops", "user1"] } },
                {
                  "__members_USER_GROUP.instanceId": {
                    $in: ["123456789abcd", "23456789abcde"],
                  },
                },
              ],
            },
          ]),
        },
      })
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
