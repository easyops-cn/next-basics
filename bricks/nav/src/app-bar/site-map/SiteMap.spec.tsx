import React from "react";
import { shallow, mount } from "enzyme";
import { SiteMap } from "./SiteMap";
import { launchpadService } from "../LaunchpadService";

jest.mock("@next-libs/basic-components", () => {
  return {
    Link: function Link() {
      return <div>Link</div>;
    },
  };
});

jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      pushVisitor: jest.fn(),
    },
  };
});

describe("SiteMap", () => {
  it("should work", () => {
    const props = {
      categoryList: [
        {
          name: "资源管理",
          id: "resource",
          apps: [
            { name: "cmdb模型管理", homepage: "/cmdb-mode", id: "cmdb-mode" },
          ],
        },
      ],
    };

    const callbackFn = jest.fn();
    const wrapper = shallow(<SiteMap {...props} />);
    expect(wrapper.find(".groupWrapper").length).toEqual(1);
    expect(wrapper.find(".groupWrapper").text()).toEqual(
      expect.stringContaining("资源管理")
    );

    const stopPropagationFn = jest.fn();
    wrapper.find(".scrollContainer").invoke("onWheel")({
      stopPropagation: stopPropagationFn,
    } as any);

    expect(stopPropagationFn).toHaveBeenCalled();
  });

  it("should work with onload callback", () => {
    const categoryList = [
      {
        name: "资源管理",
        id: "resource",
        apps: [
          { name: "cmdb模型管理", homepage: "/cmdb-mode", id: "cmdb-mode" },
        ],
      },
    ];
    const onLoadFn = jest.fn();
    const wrapper = mount(
      <SiteMap categoryList={categoryList} onLoad={onLoadFn} />
    );

    expect(onLoadFn).toHaveBeenCalled();

    wrapper.find("Link").at(0).invoke("onClick")(null);

    expect(launchpadService.pushVisitor).toHaveBeenCalledWith("app", {
      id: "cmdb-mode",
      name: "cmdb模型管理",
      homepage: "/cmdb-mode",
    });
  });
});
