import React from "react";
import { mount, shallow } from "enzyme";
import { GeneralModal } from "./GeneralModal";
import { Modal } from "antd";

describe("GeneralModal", () => {
  it("should work", () => {
    const props = {
      visible: true,
      configProps: {
        title: "default",
        width: 1000,
      },
      modalTitle: "title",
    };
    const wrapper = shallow(<GeneralModal {...props} />);
    wrapper.setProps({ enableFooterSlot: true });
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it("custom button style should work", () => {
    const props = {
      visible: true,
      configProps: {
        title: "default",
        width: 1000,
        okType: "danger",
        okText: "SomeOkText",
      },
      okDisabled: true,
      hideCancelButton: true,
      modalTitle: "title",
    };
    const wrapper = mount(<GeneralModal {...props} />);
    // wrapper类加上display: none实现的隐藏取消按钮，所以还是2个Button
    expect(wrapper.find("Button").length).toBe(2);
    expect(wrapper.find("Modal").prop("className")).toBe("wrapper");
    expect(wrapper.find("Button").at(1).prop("type")).toBe("danger");
    expect(wrapper.find("Button").at(1).prop("disabled")).toBeTruthy();
    expect(wrapper.find("Button").at(1).find("span").text()).toBe("SomeOkText");
    wrapper.setProps({ okDisabled: false });
    expect(wrapper.find("Button").at(1).prop("disabled")).toBeFalsy();
  });

  it("should work in fullscreen mode", () => {
    const props = {
      visible: true,
      modalTitle: "title",
      fullscreen: true,
    };
    const spyOnAddEventListener = jest.spyOn(window, "addEventListener");
    const spyOnRemoveEventListener = jest.spyOn(window, "removeEventListener");
    const wrapper = mount(<GeneralModal {...props} />);
    expect(
      wrapper
        .find(Modal)
        .prop("wrapClassName")
        .split(" ")
        .includes("fullscreen")
    ).toBe(true);
    expect(spyOnAddEventListener).toBeCalledWith("resize", expect.anything());
    const handler = spyOnAddEventListener.mock.calls.find(
      ([type, handler]) => type === "resize"
    )[1];
    wrapper.setProps({ visible: false });
    expect(spyOnRemoveEventListener).toBeCalledWith("resize", handler);
    expect(wrapper.find(Modal).length).toBe(1);
  });
});
