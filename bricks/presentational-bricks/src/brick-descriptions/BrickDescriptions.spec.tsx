import React from "react";
import { shallow } from "enzyme";
import { BrickDescriptions } from "./BrickDescriptions";
import { Descriptions } from "antd";

describe("BrickDescriptions", () => {
  it("should work", () => {
    const itemList = [
      {
        id: "0",
        text: "Lynette",
        label: "UserName"
      },
      {
        id: "1",
        text: "18",
        label: "Age"
      }
    ];
    const wrapper = shallow(<BrickDescriptions itemList={itemList} />);
    expect(wrapper.find(Descriptions.Item).length).toBe(2);
  });
});
