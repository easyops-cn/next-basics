import React from "react";
import { shallow } from "enzyme";
import { CardItem } from "./CardItem";
import { CardLayoutType } from "./index";
import { Avatar } from "antd";
import { fireEvent, render, screen } from "@testing-library/react";
import { createHistory, getHistory } from "@next-core/brick-kit";

createHistory();

beforeEach(() => {
  getHistory().push("/home");
});

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
        useLinkBehavior={false}
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
        useLinkBehavior={false}
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
        useLinkBehavior={false}
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
        useLinkBehavior={false}
      />
    );
    expect(wrapper.find(".descList").length).toBe(0);
    expect(wrapper.find(".desc").length).toBe(1);
    expect(wrapper.find(".iconContainer").length).toBe(1);
  });

  it("should work when showImg", () => {
    const wrapper = shallow(
      <CardItem
        cardLayoutType={CardLayoutType.ICON_ALIGN_MIDDLE}
        cardTitle="k8s"
        descriptionList="描述信息"
        showImg={true}
        imgSize={32}
        dataSource={{
          id: "1",
          name: "k8s",
          imgSrc: "/test.png",
        }}
        url="/"
        useLinkBehavior={false}
      />
    );
    expect(wrapper.find(".descList").length).toBe(0);
    expect(wrapper.find(".desc").length).toBe(1);
    expect(wrapper.find(Avatar).length).toBe(1);
  });
});

test("should work when useLinkBehavior is true and url isn't empty", () => {
  render(
    <CardItem
      cardLayoutType={CardLayoutType.ICON_ALIGN_MIDDLE}
      cardTitle="k8s"
      descriptionList="描述信息"
      showImg={true}
      imgSize={32}
      dataSource={{
        id: "1",
        name: "k8s",
        imgSrc: "/test.png",
      }}
      url="/xxx"
      useLinkBehavior
    />
  );
  fireEvent.click(screen.getByRole("link"), {
    button: 0,
  });
  expect(getHistory().location).toMatchObject({
    pathname: "/xxx",
    search: "",
  });
});
