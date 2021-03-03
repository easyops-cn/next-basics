import React from "react";
import { shallow } from "enzyme";
import { ContextItem } from "./ContextItem";
import { LinkOutlined, CodeOutlined } from "@ant-design/icons";

jest.mock("react-dnd", () => ({
  useDrag: jest.fn().mockReturnValue([{}, jest.fn()]),
  useDrop: jest
    .fn()
    .mockReturnValue([{ isOver: true, dropClassName: "drop" }, jest.fn()]),
}));

describe("ContextItem", () => {
  it("should work", () => {
    const handleItemClick = jest.fn();
    const handleItemDelete = jest.fn();
    const handleDropItem = jest.fn();
    const wrapper = shallow(
      <ContextItem
        data={{
          name: "data-b",
          value: {
            id: 1,
          },
        }}
        handleItemClick={handleItemClick}
        handleItemDelete={handleItemDelete}
        handleDropItem={handleDropItem}
        index={1}
        canDrag={true}
      />
    );
    expect(wrapper.find(CodeOutlined).length).toBe(1);
    wrapper.find(".deleteIcon").simulate("click");
    expect(handleItemDelete).toBeCalled();
    wrapper.setProps({
      data: {
        name: "data-a",
        resolve: {
          useProvider: "provider-a",
          args: ["args1"],
          if: false,
          transform: {
            value: "<% DATA %>",
          },
        },
      },
    });
    expect(wrapper.find(LinkOutlined).length).toBe(1);
    wrapper.find(".varItem").simulate("click");
    expect(handleItemClick).toBeCalled();
  });
});
