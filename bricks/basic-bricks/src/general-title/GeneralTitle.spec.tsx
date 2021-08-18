import React from "react";
import { shallow } from "enzyme";
import { GeneralTitle } from "./GeneralTitle";

describe("GeneralTitle", () => {
  it("should work", () => {
    const wrapper = shallow(
      <GeneralTitle
        mainTitle="主机-192.168.100.162"
        titleSuffixBrick={{
          useBrick: {
            brick: "span",
          },
        }}
      />
    );
    expect(wrapper.find(".titleWrapper").length).toBe(1);
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    wrapper.setProps({
      description:
        "host_load_1：23.8大于10（14:18发生紧急告警，告警资源：manny的测试应用，告警信息：detect_code:等于1，告警首次发生时间",
      descPrefixBrick: {
        useBrick: {
          brick: "span",
        },
      },
    });
    wrapper.update();
    expect(wrapper.find(".descriptionWrapper").length).toBe(1);
    expect(wrapper.find("BrickAsComponent").length).toBe(2);
    wrapper.setProps({
      dataSource: {
        title: "测试",
      },
    });
    expect(wrapper.find("BrickAsComponent").at(0).prop("data")).toEqual({
      title: "测试",
    });
  });
});
