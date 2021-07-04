import React from "react";
import { Form, Modal } from "antd";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { AddPropertyModal } from "./AddPropertyModal";

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
    expect(wrapper.find(Form.Item).at(0).prop("rules")).toEqual([
      { required: true },
    ]);
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
  });
});
