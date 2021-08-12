import React from "react";
import { mount, shallow } from "enzyme";
import { GeneralAnchor } from "./GeneralAnchor";
import { Anchor } from "antd";

const linkList = [
  {
    title: "应用资源",
    href: "https://192.168.100.162/next/resource-monitor#saas-monitor",
  },
  {
    title: "平台资源",
    href: "https://192.168.100.162/next/resource-monitor#paas-monitor",
  },
  {
    title: "基础设施",
    href: "https://192.168.100.162/next/resource-monitor#iaas-monitor",
  },
];

describe("GeneralAnchor", () => {
  it("should work", () => {
    const { Link } = Anchor;
    const wrapper = shallow(<GeneralAnchor anchorList={linkList} />);
    expect(wrapper.find(Anchor).length).toBe(1);
    expect(wrapper.find(Anchor).prop("offsetTop")).toBe(56);
    wrapper.setProps({
      type: "radio",
    });
    wrapper.update();
    expect(wrapper.find(".anchorWrapper").length).toBe(1);
    expect(wrapper.find(".anchorContainer").length).toBe(1);
    expect(wrapper.find(".anchorLinkContainer").length).toBe(1);
    expect(wrapper.find(Link).length).toBe(3);
  });
  it("should work and type ", () => {
    const linkListWidthChild = [
      {
        title: "应用资源",
        href: "https://192.168.100.162/next/resource-monitor#saas-monitor",
        children: [
          {
            title: "平台资源",
            href: "https://192.168.100.162/next/resource-monitor#paas-monitor",
          },
        ],
      },
      {
        title: "基础设施",
        href: "https://192.168.100.162/next/resource-monitor#iaas-monitor",
      },
    ];
    const { Link } = Anchor;
    const wrapper = mount(
      <GeneralAnchor anchorList={linkListWidthChild} type="default" />
    );
    expect(wrapper.find(Link).length).toBe(3);
  });
  it("should work and hasExtraSlot ", () => {
    const extraBrick = {
      useBrick: [
        {
          brick: "span",
          properties: {
            textContent: "测试",
          },
        },
      ],
    };
    const wrapper = shallow(
      <GeneralAnchor anchorList={linkList} extraBrick={extraBrick} />
    );
    expect(wrapper.find(".extraContainer").length).toBe(1);
    wrapper.setProps({
      configProps: {
        affix: true,
      },
    });
    wrapper.update();
    expect(wrapper.find(Anchor).prop("affix")).toBe(true);
  });
});
