import React from "react";
import { shallow } from "enzyme";
import { Button, Modal, Input } from "antd";
import { BrickActions } from "./BrickActions";
import { Action } from "@next-core/brick-types";

const spyOnModalError = jest.spyOn(Modal, "error");

describe("BrickActions", () => {
  it("should work when shallow rendering", () => {
    const actions: Action[] = [
      {
        text: "testAction()",
        method: "setAttribute",
        args: ["title", "modified"],
      },
      {
        text: "testPrompt()",
        method: "setAttribute",
        prompt: true,
      },
    ];
    const wrapper = shallow(
      <BrickActions actions={actions} onActionClick={null} />
    );
    expect(wrapper.find(Button).length).toBe(2);
    expect(wrapper.find(Modal).prop("visible")).toBe(false);
  });

  it("should render null when actions is falsy", () => {
    const wrapper = shallow(
      <BrickActions actions={null} onActionClick={null} />
    );
    expect(wrapper.html()).toBe(null);
  });

  it("should render null when actions is empty", () => {
    const wrapper = shallow(<BrickActions actions={[]} onActionClick={null} />);
    expect(wrapper.html()).toBe(null);
  });

  it("should work handle code editing", () => {
    const handleActionClick = jest.fn();
    const actions: Action[] = [
      {
        text: "testAction()",
        method: "setAttribute",
        args: ["title", "modified"],
      },
      {
        text: "testPrompt()",
        method: "setAttribute",
        prompt: true,
      },
    ];
    const wrapper = shallow(
      <BrickActions actions={actions} onActionClick={handleActionClick} />
    );
    const button = wrapper.find(Button);

    button.at(0).simulate("click");
    expect(handleActionClick.mock.calls[0]).toEqual([
      actions[0].method,
      actions[0].args,
    ]);
    handleActionClick.mockClear();

    expect(wrapper.find(Modal).prop("visible")).toBe(false);
    button.at(1).simulate("click");
    expect(wrapper.find(Modal).prop("visible")).toBe(true);

    wrapper.find(Modal).prop("onCancel")({} as any);
    wrapper.update();
    expect(wrapper.find(Modal).prop("visible")).toBe(false);
    button.at(1).simulate("click");
    expect(wrapper.find(Modal).prop("visible")).toBe(true);

    wrapper.find(Input.TextArea).invoke("onChange")({
      target: {
        value: "invalid json",
      },
    } as any);
    wrapper.find(Modal).invoke("onOk")({} as any);
    wrapper.update();
    expect(spyOnModalError).toBeCalled();
    spyOnModalError.mockClear();

    wrapper.find(Input.TextArea).invoke("onChange")({
      target: {
        value: '"valid but not array"',
      },
    } as any);
    wrapper.find(Modal).invoke("onOk")({} as any);
    wrapper.update();
    expect(spyOnModalError).toBeCalled();
    spyOnModalError.mockClear();

    wrapper.find(Input.TextArea).invoke("onChange")({
      target: {
        value: '["title","prompted and updated"]',
      },
    } as any);
    wrapper.update();

    wrapper.find(Modal).invoke("onOk")({} as any);
    wrapper.update();
    expect(wrapper.find(Modal).prop("visible")).toBe(false);
    expect(handleActionClick.mock.calls[0]).toEqual([
      actions[0].method,
      ["title", "prompted and updated"],
    ]);
  });
});
