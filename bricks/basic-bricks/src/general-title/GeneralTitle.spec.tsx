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
    expect(wrapper.find(".titleContent").text()).toEqual(
      "主机-192.168.100.162"
    );
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
  it("should work and url", () => {
    const wrapper = shallow(
      <GeneralTitle
        mainTitle="主机-192.168.100.162"
        titleSuffixBrick={{
          useBrick: {
            brick: "span",
          },
        }}
        url="/next/resource-monitor/summary"
      />
    );
    expect(wrapper.find("Link").length).toBe(1);
    expect(wrapper.find(".titleContentUrl").length).toEqual(1);
    wrapper.setProps({
      target: "_blank",
      subTitle: "副标题",
    });
    wrapper.update();
    expect(wrapper.find(".subTitleWrapper").length).toEqual(1);
    expect(wrapper.find(".subTitleContent").text()).toEqual("副标题");
    expect(wrapper.find("Link").at(0).prop("target")).toBe("_blank");
    expect(wrapper.find("Link").at(0).prop("to")).toBe(
      "/next/resource-monitor/summary"
    );
  });
  it("should work and descSuffixBrick", () => {
    const wrapper = shallow(
      <GeneralTitle
        mainTitle="主机-192.168.100.162"
        description="描述"
        descSuffixBrick={{
          useBrick: {
            brick: "span",
          },
        }}
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    expect(wrapper.find(".descriptionWrapper").length).toBe(1);
    wrapper.setProps({
      dataSource: {
        title: "测试2",
      },
    });
    expect(wrapper.find("BrickAsComponent").at(0).prop("data")).toEqual({
      title: "测试2",
    });
  });
});
