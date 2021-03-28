import React from "react";
import { shallow } from "enzyme";
import { SiteMap } from "./SiteMap";

describe("SiteMap", () => {
  it("should work", () => {
    const props = {
      categoryList: [
        {
          name: "资源管理",
          items: [{ name: "cmdb模型管理", link: "/cmdb-mode" }],
        },
      ],
    };
    const wrapper = shallow(<SiteMap {...props} />);
    expect(wrapper.find(".groupWrapper").length).toEqual(1);
    expect(wrapper.find(".groupWrapper").text()).toEqual(
      expect.stringContaining("资源管理")
    );
  });
});
