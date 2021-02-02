import React from "react";
import { shallow } from "enzyme";
import { SubMenu } from "./SubMenu";

describe("SubMenu", () => {
  it("should work", () => {
    const dataSource = {
      title: "IP网段管理",
      menuItems: [
        {
          type: "default",
          text: "基本信息",
          to: "/contract/subMenu",
          exact: true
        },
        {
          type: "group",
          title: "资源关系",
          items: [
            {
              text: "所在机柜",
              to: "/contract/subMenu/host"
            },
            {
              text: "运维人员",
              to: "/contract/subMenu/person"
            }
          ]
        }
      ]
    };
    const wrapper = shallow(<SubMenu dataSource={dataSource} />);
    expect(wrapper).toMatchSnapshot();
  });
});
