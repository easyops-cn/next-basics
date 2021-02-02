import React from "react";
import { shallow } from "enzyme";
import { CardItem } from "./CardItem";
import { CardLayoutType } from "./index";

describe("CardItem", () => {
  it("should work", () => {
    const wrapper = shallow(
      <CardItem
        cardTitle="k8s"
        descriptionList={["Deployment 工作模式", "1 个负载均衡器"]}
        icon={{
          lib: "easyops",
          category: "app",
          icon: "k8s",
        }}
        iconStyle={{
          opacity: 0.5,
          right: "-20px",
          bottom: "-20px",
        }}
        dataSource={{
          id: "1",
          name: "k8s",
        }}
        url="/"
      />
    );
    expect(wrapper.find(".descList").children()).toHaveLength(2);
  });

  it("should work when CardLayoutType is icon-align-right", () => {
    const wrapper = shallow(
      <CardItem
        cardLayoutType={CardLayoutType.ICON_ALIGN_RIGHT}
        cardTitle="k8s"
        descriptionList="描述信息"
        icon={{
          lib: "easyops",
          category: "app",
          icon: "k8s",
        }}
        iconStyle={{
          opacity: 0.5,
          right: "-20px",
          bottom: "-20px",
        }}
        dataSource={{
          id: "1",
          name: "k8s",
        }}
        url="/"
      />
    );
    expect(wrapper.find(".descList").length).toBe(0);
    expect(wrapper.find(".desc").length).toBe(1);
  });
  it("should work when CardLayoutType is icon-align-left", () => {
    const wrapper = shallow(
      <CardItem
        cardLayoutType={CardLayoutType.ICON_ALIGN_LEFT}
        cardTitle="k8s"
        descriptionList="描述信息"
        icon={{
          lib: "easyops",
          category: "app",
          icon: "k8s",
        }}
        iconStyle={{
          opacity: 0.5,
          right: "-20px",
          bottom: "-20px",
        }}
        dataSource={{
          id: "1",
          name: "k8s",
        }}
        url="/"
      />
    );
    expect(wrapper.find(".descList").length).toBe(0);
    expect(wrapper.find(".desc").length).toBe(1);
  });
  it("should work when CardLayoutType is icon-align-middle", () => {
    const wrapper = shallow(
      <CardItem
        cardLayoutType={CardLayoutType.ICON_ALIGN_MIDDLE}
        cardTitle="k8s"
        descriptionList="描述信息"
        icon={{
          lib: "easyops",
          category: "app",
          icon: "k8s",
        }}
        iconStyle={{
          opacity: 0.5,
          right: "-20px",
          bottom: "-20px",
        }}
        dataSource={{
          id: "1",
          name: "k8s",
        }}
        url="/"
      />
    );
    expect(wrapper.find(".descList").length).toBe(0);
    expect(wrapper.find(".desc").length).toBe(1);
    expect(wrapper.find(".iconContainer").length).toBe(1);
  });
});
