import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  CascaderDataSetter,
  CascaderDataSetterAdapter,
} from "./CascaderDataSetter";
import { act } from "react-dom/test-utils";
import { Form } from "@ant-design/compatible";
import { Input, Button, Modal, Collapse } from "antd";
import { shallow, mount } from "enzyme";

describe("CascaderDataSetter", () => {
  it("should work", () => {
    const props = {
      value: [] as any,
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = shallow(<CascaderDataSetter {...props} />);
    shallow(<CascaderDataSetterAdapter {...props} />);
    expect(wrapper.find(Modal).props().visible).toBe(false);
  });

  it("should work when change", () => {
    const props = {
      value: [] as any,
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<CascaderDataSetter {...props} />);
    act(() => {
      wrapper.find(Button).at(0).simulate("click");
    });
    wrapper.update();
    act(() => {
      wrapper.find(Modal).find(Button).at(0).simulate("click");
    });
    wrapper.update();

    act(() => {
      wrapper
        .find(Form)
        .at(0)
        .find(Input)
        .at(0)
        .props()
        .onChange({ target: { value: "label" } } as any);
      wrapper
        .find(Form)
        .at(0)
        .find(Input)
        .at(1)
        .props()
        .onChange({ target: { value: "value" } } as any);
      wrapper.find(Form).at(0).find(Button).at(0).simulate("click");
    });
    wrapper.update();

    act(() => {
      wrapper
        .find(Collapse)
        .at(0)
        .props()
        .onChange([] as any);
      expect(wrapper.find(Collapse).at(0).props().activeKey?.length).toBe(1);
    });
    wrapper.update();

    act(() => {
      wrapper.find(Form).at(0).find(Button).at(1).simulate("click");
      wrapper.find(Modal).invoke("onOk")({} as any);
      expect(props.onChange).toBeCalled();

      wrapper.find(Modal).invoke("onCancel")({} as any);
      expect(props.onChange).toBeCalled();
    });
  });
});
