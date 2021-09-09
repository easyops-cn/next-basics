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
        label: "UserName",
      },
      {
        id: "1",
        text: "18",
        label: "Age",
      },
    ];
    const wrapper = shallow(<BrickDescriptions itemList={itemList} />);
    expect(wrapper.find(Descriptions.Item).length).toBe(2);
  });

  it("should work when set hideGroups", () => {
    const itemList = [
      {
        id: "0",
        text: "Lynette",
        label: "UserName",
      },
      {
        id: "1",
        text: "18",
        label: "Age",
      },
      {
        id: "3",
        text: "2022",
        label: "year",
        group: "a",
      },
      {
        id: "4",
        text: "123456",
        label: "phone",
        group: "a",
      },
      {
        id: "5",
        text: "aaa@gmail.com",
        label: "email",
        group: "b",
      },
      {
        id: "6",
        text: "street",
        label: "address",
        group: "b",
      },
    ];
    const wrapper = shallow(<BrickDescriptions itemList={itemList} />);
    expect(wrapper.find(Descriptions.Item).length).toBe(6);
    wrapper.setProps({
      hideGroups: "b",
    });
    wrapper.update();
    expect(wrapper.find(Descriptions.Item).length).toBe(4);
    wrapper.setProps({
      hideGroups: ["a", "b"],
    });
    wrapper.update();
    expect(wrapper.find(Descriptions.Item).length).toBe(2);
  });
});
