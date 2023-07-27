import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BusinessRule } from "./BusinessRule";
import { shallow, mount } from "enzyme";
import { Popover, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const props = {
  dataSource: [
    {
      actionType: "display",
      conditions: {
        groups: [
          {
            groupId: "group_1072",
            conditions: [
              {
                origin: "a111(a1)",
                operation: "equal",
                value: "55",
                op: "and",
                conditionId: "condition_1071",
              },
              {
                origin: "b(b)",
                operation: "equal",
                value: "44",
                op: "and",
                conditionId: "condition_1396",
              },
            ],
          },
          {
            groupId: "group_1720",
            conditions: [
              {
                origin: "test5(test5)",
                operation: "equal",
                value: "44",
                op: "and",
                conditionId: "condition_1721",
              },
            ],
          },
        ],
        op: "and",
      },
      eventType: "",
      origin: "",
      target: "",
      title: "333",
      eventId: "__event_1070",
      actions: [
        {
          actionType: "show",
          target: "a111(a1)",
        },
      ],
    },
    {
      actionType: "linkage",
      conditions: {},
      eventType: "",
      origin: "b(b)",
      target: "test",
      title: "aaaa",
      eventId: "__event_3436",
    },
    {
      actionType: "submit",
      conditions: {},
      eventType: "",
      origin: "",
      target: "test",
      title: "aaa",
      eventId: "__event_4085",
    },
    {
      actionType: "update",
      conditions: {},
      eventType: "",
      origin: "b(b)",
      target: "test",
      title: "333",
      eventId: "__event_4413",
    },
    {
      actionType: "setting",
      conditions: {},
      eventType: "",
      origin: "a111(a1)",
      target: "test",
      title: "333",
      eventId: "__event_4743",
      settingValue: "[{a:1}]",
    },
  ],
  handleEdit: jest.fn(),
  handleDelete: jest.fn(),
};

describe("BusinessRule", () => {
  it("should work", () => {
    render(<BusinessRule {...props} />);
    fireEvent.click(screen.getByTestId("my-brick"));
    expect(screen.getByTestId("my-brick")).toBeTruthy();
  });

  it("should work", () => {
    const wrapper = mount(<BusinessRule {...props} />);
    wrapper.find(Popover).at(0).simulate("click");
    wrapper.update();
    wrapper.find(EditOutlined).at(0).simulate("click");
    wrapper.find(DeleteOutlined).at(0).simulate("click");
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
