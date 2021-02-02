import React from "react";
import { mount } from "enzyme";
import { PopoverContainer } from "./PopoverContainer";
import { Popover } from "antd";

const props = {
  showPopoverBg: false,
  id: "story-point-edit",
  displayBrick: {
    useBrick: {
      brick: "div",
      properties: {
        id: "story-point-display"
      },
      transform: {
        textContent: "@{storyPoint}"
      }
    }
  },
  popoverContentStyle: {
    width: "60px"
  },
  popoverBrick: {
    useBrick: {
      brick: "forms.general-select",
      properties: {
        inputBoxStyle: {
          width: 60
        },
        allowClear: false,
        options: [
          {
            label: "0.5",
            value: "0.5"
          },
          {
            label: "1",
            value: "1"
          },
          {
            label: "1.5",
            value: "1.5"
          },
          {
            label: "2",
            value: "2"
          },
          {
            label: "2.5",
            value: "2.5"
          },
          {
            label: "3",
            value: "3"
          }
        ]
      },
      transform: {
        value: "@{storyPoint}"
      }
    }
  }
};

describe("PopoverContainer", () => {
  it("should work", () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <PopoverContainer
        displayBrick={props.displayBrick}
        popoverBrick={props.popoverBrick}
        onVisibleChange={onVisibleChange}
        showPopoverBg={props.showPopoverBg}
        popoverContentStyle={props.popoverContentStyle}
        triggerByIcon={true}
        showIcon="hover"
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    wrapper.find(".editIcon").simulate("click");
    expect(onVisibleChange).toHaveBeenCalled();
    wrapper.setProps({
      visible: true,
      popoverContentStyle: {
        width: 50
      },
      showPopoverBg: true
    });
    wrapper.update();
    expect(wrapper.find("BrickAsComponent").length).toBe(2);
  });

  it("test showIcon and triggerByIcon", () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <PopoverContainer
        displayBrick={props.displayBrick}
        popoverBrick={props.popoverBrick}
        onVisibleChange={onVisibleChange}
        showPopoverBg={props.showPopoverBg}
        trigger="hover"
        triggerByIcon={false}
        showIcon="always"
      />
    );
    expect(wrapper.find(".editIconVisible").length).toBe(1);
    wrapper.setProps({
      trigger: "click"
    });
    wrapper.update();
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    wrapper.find(".displayBrick").simulate("click");
    expect(wrapper.find("BrickAsComponent").length).toBe(2);
    wrapper.find(".displayBrick").simulate("click");
    expect(wrapper.find(Popover).prop("visible")).toBe(false);
  });
});
