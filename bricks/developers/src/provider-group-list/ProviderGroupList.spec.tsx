import React from "react";
import { shallow } from "enzyme";
import { ProviderGroupList } from "./ProviderGroupList";

describe("ProviderGroupList", () => {
  it("should work", () => {
    const props = {
      dataSource: [
        {
          name: "cmdb",
          label: "cmdb",
          description: "cmdb",
          groups: [
            {
              name: "instance",
              label: "cmdb 实例",
              items: [
                {
                  name: "post-search",
                  description: "实例搜索",
                },
                {
                  name: "instance.create",
                  description: "实例创建",
                },
              ],
            },
          ],
        },
      ],
      onClick: jest.fn(),
    };
    const wrapper = shallow(<ProviderGroupList {...props} />);
    expect(wrapper.find(".groupName").text()).toEqual("cmdb");

    wrapper.find(".name").invoke("onClick")(null);
    expect(props.onClick).toHaveBeenCalledWith("cmdb", {
      items: [
        { description: "实例搜索", name: "post-search" },
        { description: "实例创建", name: "instance.create" },
      ],
      label: "cmdb 实例",
      name: "instance",
    });
  });
});
