import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import "@testing-library/jest-dom";
import { CmdbCascaderPathSetter } from "./CmdbCascaderPathSetter";
import { Button, Select } from "antd";
import { getObjectAllByIndexDB } from "../processors";
import { cloneDeep } from "lodash";
import { MinusCircleOutlined } from "@ant-design/icons";
import { CmdbCascaderPathSetterAdapter } from "./CmdbCascaderPathSetter";

const APPModel = {
  objectId: "APP",
  name: "应用",
  relation_list: [
    {
      relation_id: "APP_APPTEMPLATE_APP_APPTEMPLATE",
      name: "",
      protected: false,
      notifyDenied: false,
      isInherit: false,
      left_object_id: "APP",
      leftInheritObjectId: "",
      left_id: "APPTEMPLATE",
      left_description: "子系统",
      left_remark: "yingyong duan1",
      left_name: "应用端资源需求信息",
      left_min: 0,
      left_max: 1,
      left_groups: [],
      left_tags: [],
      left_required: false,
      right_object_id: "APPTEMPLATE",
      rightInheritObjectId: "",
      right_id: "APP",
      right_description: "应用端资源需求信息",
      right_remark: "zixiong2",
      right_name: "子系统",
      right_min: 0,
      right_max: 1,
      right_groups: [],
      right_tags: [""],
      right_required: false,
      _version: 13,
      attrList: [],
      indexList: [],
    },
    {
      relation_id: "APP_APP_DSC_APP_RESOURCE_APP",
      name: "",
      protected: false,
      notifyDenied: false,
      isInherit: false,
      left_object_id: "APP",
      leftInheritObjectId: "",
      left_id: "APP_DSC",
      left_description: "源系统",
      left_remark: "应用-应用2",
      left_name: "目标系统",
      left_min: 0,
      left_max: -1,
      left_groups: [],
      left_tags: [],
      left_required: false,
      right_object_id: "APP",
      rightInheritObjectId: "",
      right_id: "APP_RESOURCE",
      right_description: "目标系统",
      right_remark: "应用-应用",
      right_name: "源系统",
      right_min: 0,
      right_max: -1,
      right_groups: [],
      right_tags: [],
      right_required: false,
      _version: 9,
      attrList: [],
      indexList: [],
    },
  ],
  parentObjectIds: [],
};

jest.mock("lodash", () => ({
  keyBy: () => {
    return {
      APP: APPModel,
    };
  },
}));

jest.mock("../processors");
const objectModel = getObjectAllByIndexDB as jest.Mock;

describe("CmdbCascaderPathSetter", () => {
  it("should work", () => {
    const wrapper = shallow(<CmdbCascaderPathSetter />);
    const wrapper1 = shallow(<CmdbCascaderPathSetterAdapter />);
    expect(wrapper.find(Button).length).toBe(1);
  });

  it("should mount work", () => {
    const wrapper = mount(<CmdbCascaderPathSetter />);
    expect(wrapper.find(Button).length).toBe(1);
  });

  it("test objectPath is string array", () => {
    const wrapper = shallow(<CmdbCascaderPathSetter value={["HOST"]} />);
    expect(wrapper.find(".ant-select").children().length).toBe(2);
  });

  it("test objectPath is object array", () => {
    const wrapper = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "HOST", showKey: ["name"] }]}
      />
    );
    expect(wrapper.find(".ant-select").children().length).toBe(2);
  });

  it("test ObjectId selecter change event", async () => {
    const mockChangeEvent = jest.fn();
    const wrapper = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "HOST", showKey: ["name"] }]}
      />
    );
    wrapper.find(Select).at(0).invoke("onChange")(["APP"], null);
    await (global as any).flushPromises();
    const wrapper1 = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "HOST", showKey: ["name"] }]}
        onChange={mockChangeEvent}
      />
    );
    wrapper1.find(Select).at(0).invoke("onChange")(["APP"], null);
    await (global as any).flushPromises();
    expect(mockChangeEvent).lastCalledWith([
      {
        objectId: ["APP"],
        showKey: ["name"],
      },
    ]);
  });

  it("test ShowKey selecter change event", async () => {
    const mockChangeEvent = jest.fn();
    const wrapper = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "HOST", showKey: ["name"] }]}
      />
    );
    wrapper.find(Select).at(1).invoke("onChange")(["APP"], null);
    await (global as any).flushPromises();
    const wrapper1 = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "HOST", showKey: ["name"] }]}
        onChange={mockChangeEvent}
      />
    );
    wrapper1.find(Select).at(1).invoke("onChange")(["hostname"], null);
    await (global as any).flushPromises();
    expect(mockChangeEvent).lastCalledWith([
      {
        objectId: "HOST",
        showKey: ["hostname"],
      },
    ]);
  });

  it("test add event", async () => {
    const wrapper = shallow(<CmdbCascaderPathSetter />);
    wrapper.find(Button).invoke("onClick")({} as any);
    const mockChangeEvent = jest.fn();
    objectModel.mockResolvedValueOnce([APPModel]);
    const wrapper1 = mount(
      <CmdbCascaderPathSetter
        value={[{ objectId: "APP", showKey: ["name"] }]}
        onChange={mockChangeEvent}
      />
    );

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper1.update();
    wrapper1.find(Button).invoke("onClick")({} as any);
    await (global as any).flushPromises();
    expect(mockChangeEvent).lastCalledWith([
      {
        objectId: "APP",
        showKey: ["name"],
      },
      {
        objectId: "APPTEMPLATE",
        showKey: ["name"],
      },
    ]);
  });

  it("test add event branch line", async () => {
    const mockChangeEvent = jest.fn();
    objectModel.mockResolvedValueOnce([{ ...APPModel }]);
    const wrapper = shallow(
      <CmdbCascaderPathSetter
        value={[{ showKey: ["name"] }] as any}
        onChange={mockChangeEvent}
      />
    );
    wrapper.find(Button).invoke("onClick")({} as any);
    expect(mockChangeEvent).toBeCalledTimes(0);
  });

  it("test remove event", async () => {
    const mockChangeEvent = jest.fn();
    objectModel.mockResolvedValueOnce([{ ...APPModel }]);
    const wrapper = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "APP", showKey: ["name"] }] as any}
        onChange={mockChangeEvent}
      />
    );
    wrapper.find(MinusCircleOutlined).invoke("onClick")({
      ObjectId: "APP",
      showKey: ["name"],
    } as any);
    expect(mockChangeEvent).toBeCalledTimes(1);

    mockChangeEvent.mockClear();
    const wrapper1 = shallow(
      <CmdbCascaderPathSetter
        value={[{ objectId: "APP", showKey: ["name"] }] as any}
        onChange={mockChangeEvent}
        disabled={true}
      />
    );
    wrapper1.find(MinusCircleOutlined).invoke("onClick")({
      ObjectId: "APP",
      showKey: ["name"],
    } as any);
    expect(mockChangeEvent).toBeCalledTimes(0);
  });
});
