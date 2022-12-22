import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BusinessRule } from "./BusinessRule";
import { shallow, mount } from "enzyme";
import { Popover } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const props = {
  ruleTitle: "xx",
  textArray: [
    [
      {
        text: "xxx",
        show: "normal",
      },
      {
        text: "xxx",
        show: "hightlight",
      },
    ],
  ] as any,
  handleEdit: jest.fn(),
  handleDelete: jest.fn(),
};

describe("BusinessRule", () => {
  it("should work", () => {
    render(<BusinessRule {...props} />);
    fireEvent.click(screen.getByTestId("my-brick"));
    expect(screen.getByTestId("my-brick")).toHaveTextContent("xxxxxxxx");
  });

  it("should work", () => {
    const wrapper = mount(<BusinessRule {...props} />);
    wrapper.find(Popover).simulate("click");
    wrapper.update();
    wrapper.find(EditOutlined).simulate("click");
    wrapper.find(DeleteOutlined).simulate("click");
    expect(props.handleEdit).toBeCalled();
    expect(props.handleDelete).toBeCalled();
  });
});
