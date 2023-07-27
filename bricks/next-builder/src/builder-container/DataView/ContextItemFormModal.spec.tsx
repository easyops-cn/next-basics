import React from "react";
import { shallow } from "enzyme";
import { Modal } from "antd";
import i18next from "i18next";
import { ContextItemFormModal } from "./ContextItemFormModal";
import { K } from "../../i18n/constants";
import { useBuilderUIContext } from "../BuilderUIContext";

jest.mock("../BuilderUIContext");

(useBuilderUIContext as jest.Mock).mockReturnValue({
  containerForContextModal: "#test-container",
});

jest.mock("./ContextItemForm", () => ({
  ContextItemForm: function MockContextItemForm() {
    return <div>form</div>;
  },
}));

describe("ContextItemFormModal", () => {
  it("should work", () => {
    const onContextItemUpdate = jest.fn();
    const handleOk = jest.fn();
    const handleCancel = jest.fn();
    const settingItemForm = {
      resetFields: jest.fn(),
    } as any;
    const wrapper = shallow(
      <ContextItemFormModal
        data={{
          name: "data-a",
          resolve: {
            useProvider: "provider-a",
            args: ["args1"],
            if: false,
            transform: {
              value: "<% DATA %>",
            },
          },
        }}
        onContextItemUpdate={onContextItemUpdate}
        settingItemForm={settingItemForm}
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    );
    expect(wrapper.find(Modal).prop("title")).toBe(
      `${i18next.t(K.SETTINGS)} - data-a`
    );
    expect(wrapper.find(Modal).prop("getContainer")).toBe("#test-container");

    wrapper.setProps({
      data: undefined,
    });
    expect(wrapper.find(Modal).prop("title")).toBe(i18next.t(K.ADD_DATA));
  });
});
