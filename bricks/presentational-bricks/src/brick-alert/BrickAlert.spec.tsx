import React from "react";
import { Alert } from "antd";
import { shallow } from "enzyme";
import { BrickAlert } from "./BrickAlert";
import { UpOutlined } from "@ant-design/icons";

describe("BrickAlert", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickAlert type="success" message="brick alert text" />
    );
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("closeText")).toBeFalsy();
  });

  it("closeOnce should work", () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <BrickAlert
        type="success"
        message="brick alert text"
        closable={true}
        closeOnce={true}
        onClose={fn}
        enableDescSlot={true}
      />
    );
    const alert = wrapper.find(Alert).first();
    alert.invoke("onClose")(null);
    expect(fn).toBeCalled();
    expect(alert.prop("closeText")).toBeTruthy();
  });

  it("icon should work", () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <BrickAlert
        type="success"
        message="brick alert text"
        closable={true}
        closeOnce={true}
        onClose={fn}
        enableDescSlot={true}
        iconSize="small"
      />
    );
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("icon")).not.toBeUndefined();
  });
  it("icon should work", () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <BrickAlert
        type="success"
        message="brick alert text"
        closable={true}
        closeOnce={true}
        onClose={fn}
        enableDescSlot={true}
        iconSize="big"
        foldDesc={true}
      />
    );
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("icon")).not.toBeUndefined();
  });
  it("icon should not work", () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <BrickAlert
        type="success"
        message="brick alert text"
        closable={true}
        closeOnce={true}
        onClose={fn}
        enableDescSlot={true}
        foldDesc={true}
      />
    );
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("icon")).toBeUndefined();
  });
});
