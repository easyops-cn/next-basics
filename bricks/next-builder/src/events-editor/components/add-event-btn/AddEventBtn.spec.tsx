import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Menu } from "antd";
import { AddEventBtn } from "./AddEventBtn";
import { EventConfig } from "../../../shared/visual-events/interfaces";

describe("AddEventBtn", () => {
  it("should work", async () => {
    const props = {
      eventList: [
        {
          name: "tabs.click",
          events: [{ action: "console.log" }],
        },
        {
          name: "tabs.select",
          events: [
            {
              target: "#create-form",
              properties: {
                value: {
                  a: "abc",
                },
              },
            },
          ],
        },
      ] as EventConfig[],
      eventDocInfo: [
        { type: "tabs.click" },
        { type: "tabs.select" },
        { type: "tabs.change" },
      ],
      onClick: jest.fn(),
    };

    const wrapper = mount(<AddEventBtn {...props} />);

    await act(async () => {
      wrapper.find(".ant-btn-link").invoke("onClick")(null);
    });

    wrapper.update();

    expect(wrapper.find(Menu.Item).length).toEqual(1);

    wrapper.setProps({
      eventList: [
        {
          name: "tabs.click",
          events: [{ action: "console.log" }],
        },
        {
          name: "tabs.select",
          events: [
            {
              target: "#create-form",
              properties: {
                value: {
                  a: "abc",
                },
              },
            },
          ],
        },
        {
          name: "tabs.change",
          events: [
            {
              action: "console.info",
            },
          ],
        },
      ] as EventConfig[],
    });

    await act(async () => {
      wrapper.find(".ant-btn-link").invoke("onClick")(null);
    });

    wrapper.update();

    expect(wrapper.find(Menu.Item).length).toEqual(0);

    wrapper.find(Menu).invoke("onClick")({ key: "tabs.select" } as any);

    expect(props.onClick).toHaveBeenCalled();
  });
});
