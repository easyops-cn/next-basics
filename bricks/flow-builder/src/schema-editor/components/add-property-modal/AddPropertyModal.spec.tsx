import React from "react";
import { Form, Modal, Select, Radio, InputNumber } from "antd";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { AddPropertyModal } from "./AddPropertyModal";
import { Link } from "@next-libs/basic-components";

jest.mock("@next-libs/basic-components", () => {
  return {
    Link: function Link() {
      return <div>Link</div>;
    },
  };
});

describe("AddPropertyModal", () => {
  it("should work", () => {
    const props = {
      visible: true,
      isEdit: true,
      trackId: "root-0",
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      initValue: {
        type: "string",
        name: "name",
        description: "名称",
      },
    };
    const wrapper = shallow(<AddPropertyModal {...props} />);
    wrapper.find(Modal).invoke("onOk")(null);
    wrapper.find(Modal).invoke("onCancel")(null);
    expect(props.onClose).toHaveBeenCalled();

    wrapper.find(Form).invoke("onFinish")({
      name: "name2",
      type: "string",
      description: "名称",
    });
    expect(props.onSubmit).toHaveBeenCalledWith(
      { description: "名称", name: "name2", type: "string" },
      "root-0",
      true
    );
  });

  it("should work", async () => {
    const props = {
      visible: true,
      isEdit: true,
      trackId: "root-0",
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      initValue: {
        type: "string",
        name: "name",
        description: "名称",
      },
    };
    const wrapper = mount(<AddPropertyModal {...props} />);
    await act(async () => {
      await (global as any).flushPromises();
    });

    expect(
      document.querySelectorAll("span[title='SCHEMA_ITEM_NORMAL']").length
    ).toEqual(1);

    wrapper
      .find("Select[placeholder='ENUM_INPUT_PLACEHOLDER']")
      .invoke("onChange")(["a", "b", "c"]);

    await wrapper.find(Form).prop("form").validateFields();

    expect(wrapper.find(Form).prop("form").getFieldValue("enum")).toEqual([
      "a",
      "b",
      "c",
    ]);

    wrapper.setProps({
      initValue: {
        ref: "IP",
        name: "hostname",
        description: "主机",
      },
    });

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(
      document.querySelectorAll("span[title='SCHEMA_ITEM_REF']").length
    ).toEqual(1);

    expect(
      wrapper.find(".ant-form-item-required[title='Name']").length
    ).toEqual(0);

    wrapper.find(Select).at(0).invoke("onChange")("normal", null);

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(
      wrapper.find(".ant-form-item-required[title='NAME_LABEL']").length
    ).toEqual(1);

    wrapper.setProps({
      initValue: {
        type: "bool",
        name: "enabled",
        description: "是否开启",
      },
    });

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(wrapper.find(Radio).length).toEqual(2);

    wrapper.setProps({
      initValue: {
        type: "int",
        name: "conut",
        description: "数量",
      },
    });

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(wrapper.find(InputNumber).length).toEqual(1);

    wrapper.setProps({
      initValue: {
        type: "int",
        name: "age",
        description: "年龄",
      },
    });

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    wrapper
      .find("Select[placeholder='ENUM_INPUT_PLACEHOLDER']")
      .invoke("onChange")(["10", "20", "30"]);

    await wrapper.find(Form).prop("form").validateFields();

    expect(wrapper.find(Form).prop("form").getFieldValue("enum")).toEqual([
      10, 20, 30,
    ]);
  });

  it("should work with response root node", async () => {
    const props = {
      visible: true,
      isEdit: true,
      trackId: "root",
      enableWrapper: true,
      rootNodeRequired: {
        type: true,
        description: true,
      },
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      initValue: {
        type: "Task",
        name: "response",
        description: "响应体",
      },
    };
    const wrapper = mount(<AddPropertyModal {...props} />);
    await act(async () => {
      await (global as any).flushPromises();
    });

    expect(wrapper.find(Link).prop("to")).toEqual(
      "/contract-center/models/create"
    );
  });
});
