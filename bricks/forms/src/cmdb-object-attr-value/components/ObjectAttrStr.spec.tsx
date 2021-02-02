import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrStr } from "./ObjectAttrStr";
import { Form } from "@ant-design/compatible";
import {
  Select,
  Input,
  Row,
  Col,
  Radio,
  Button,
  Popover,
  InputNumber,
} from "antd";
import { render, fireEvent } from "@testing-library/react";

const Option = Select.Option;

const defaultValue = {
  mode: "default",
  default_type: "value",
  regex: "",
  start_value: 1,
  prefix: "",
  default: "",
};

describe("ObjectAttrStr", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrStr {...props} />);
    expect(wrapper.find(Radio.Group).at(0).props().value).toBe("default");
  });

  it("should change regex", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrStr {...props} />);
    wrapper.find("Row").at(0).children(0).invoke("onChange")({
      target: { value: "dd" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      regex: "dd",
    });
  });

  it("should change mode", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrStr {...props} />);
    wrapper.find("Row").at(1).children(0).invoke("onChange")({
      target: { value: "url" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      mode: "url",
    });
    wrapper.find(Input).at(1).invoke("onChange")({ target: { value: "test" } });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: "test",
      mode: "url",
    });
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrStr {...props} />);
    wrapper.find("Row").at(1).children(0).invoke("onChange")({
      target: { value: "markdown" },
    });
    wrapper.find(Input.TextArea).at(0).invoke("onChange")({
      target: { value: "test" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: "test",
      mode: "markdown",
    });
  });

  it("should change default_type", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrStr {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")("function", null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: "guid()",
      default_type: "function",
    });
    wrapper.find(Select).at(0).invoke("onChange")("auto-increment-id", null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default_type: "auto-increment-id",
    });
    wrapper.find(Select).at(0).invoke("onChange")("series-number", null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default_type: "series-number",
    });
  });

  it("should change prefix", async () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrStr {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")("auto-increment-id", null);
    wrapper.update();

    wrapper.find(".auto-increment-id-prefix").at(0).invoke("onChange")({
      target: { value: "pre" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default_type: "auto-increment-id",
      prefix: "pre",
    });

    wrapper.find(Select).at(0).invoke("onChange")("series-number", null);
    wrapper.update();
    wrapper.find(".series-number-prefix").at(0).invoke("onChange")({
      target: { value: "pre" },
    });
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      prefix: "pre",
      default_type: "series-number",
    });
  });

  it("should change series_number_length", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrStr {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")("series-number", null);
    wrapper.find(InputNumber).at(0).invoke("onChange")(5);
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default_type: "series-number",
      series_number_length: 5,
    });
  });

  it("should change start_value", () => {
    const props = {
      value: {
        mode: "default",
        default_type: "auto-increment-id",
        regex: "",
        start_value: 1,
        prefix: "",
        series_number_length: 1,
      },
      onChange: jest.fn(),
    };
    const { getByText, queryByTestId } = render(<ObjectAttrStr {...props} />);
    const popoverBtn = getByText("高级");
    fireEvent.click(popoverBtn);
    fireEvent.change(queryByTestId("start-value-input"), {
      target: { value: 5 },
    });
    const confirmBtn = queryByTestId("start-value-confirm");

    fireEvent.click(confirmBtn);

    expect(props.onChange).toBeCalledWith({
      regex: "",
      mode: "default",
      prefix: "",
      default_type: "auto-increment-id",
      start_value: 5,
      series_number_length: 1,
    });
  });
});
