import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BusinessRule } from "./BusinessRule";
import { shallow, mount } from "enzyme";
import { Popover, Empty } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const props = {
  dataSource: [
    {
      title: "xx",
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
      ],
    },
  ],
  handleEdit: jest.fn(),
  handleDelete: jest.fn(),
};

describe("BusinessRule", () => {
  it("should work", () => {
    render(<BusinessRule {...props} />);
    fireEvent.click(screen.getByTestId("my-brick"));
    expect(screen.getByTestId("my-brick")).toHaveTextContent("xxxxxx");
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

  it("should Empty work", () => {
    const newProps = {
      ...props,
      dataSource: null,
    };
    const wrapper = mount(<BusinessRule {...newProps} />);
    expect(wrapper.find(Empty).length).toBe(1);
  });
});
