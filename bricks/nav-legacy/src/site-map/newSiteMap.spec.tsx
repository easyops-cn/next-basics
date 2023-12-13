import React from "react";
import {
  SubCategory,
  NewSiteMap,
  ModelTree,
  filterBySearch,
  matchSearchValue,
  RenderName,
  getNewFavouriteList,
  encode,
} from "./newSiteMap";
import { shallow, mount } from "enzyme";
import { Button, Popover } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { GeneralIcon, Link } from "@next-libs/basic-components";

import * as kit from "@next-core/brick-kit";

const data = {
  data: [
    {
      objectId: "APP",
      name: "app",
      category: "A",
    },
    {
      objectId: "HOST",
      name: "host",
      category: "B",
    },
  ],
};

(global as any).fetch = jest
  .fn()
  .mockImplementation(() => JSON.stringify({ data: data }));

describe("newSiteMap", () => {
  const groupList = [
    {
      name: "平台资源",
      title: "平台资源",
      objectList: [
        {
          name: "modelA",
          objectId: "A",
          category: "平台资源",
        },
      ],
      subCategory: [
        {
          name: "RS",
          title: "RS",
          objectList: [
            {
              name: "modelB",
              objectId: "B",
              category: "平台资源.RS",
            },
          ],
        },
        {
          name: "数据库变更",
          title: "数据库变更",
          objectList: [],
        },
      ],
    },
    {
      name: "应用资源",
      title: "应用资源",
      objectList: [{ name: "modelC", objectId: "C", category: "应用资源" }],
      subCategory: [
        {
          name: "门户",
          title: "门户",
          objectList: [
            {
              name: "modelD",
              objectId: "D",
              category: "应用资源.门户",
            },
          ],
        },
        {
          name: "服务监测",
          title: "服务监测",
          objectList: [],
        },
      ],
    },
  ];
  it("should work with SubCategory", () => {
    jest.spyOn(kit, "getRuntime").mockReturnValue({
      getFeatureFlags() {
        return {
          "cmdb-sitemap-menu-show-all-model": false,
        };
      },
    } as any);

    jest.spyOn(kit, "getHistory").mockReturnValue({ location: {} });
    const objectList = [
      { name: "集群", objectId: "CLUSTER" },
      { name: "测试", objectId: "TEST" },
    ];
    const wrapper = mount(
      <SubCategory title="门户" name="门户" objectList={objectList} />
    );
    expect(wrapper).toMatchSnapshot();
    const toggleBtn = wrapper.find(Button);
    expect(wrapper.find(DownOutlined)).toHaveLength(1);
    expect(wrapper.find(UpOutlined)).toHaveLength(0);
    expect(wrapper.find(Link)).toHaveLength(0);
    toggleBtn.simulate("click");
    expect(wrapper.find(DownOutlined)).toHaveLength(0);
    expect(wrapper.find(UpOutlined)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(2);
  });
  it("should work with NewSiteMap", () => {
    const wrapper = mount(<NewSiteMap />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should work with ModelTree", () => {
    const wrapper = mount(<ModelTree groupList={groupList} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should work with matchSearchValue", () => {
    expect(matchSearchValue({ objectId: "APP", name: "应用" }, "app")).toBe(
      true
    );
    expect(matchSearchValue({ objectId: "APP", name: "应用" }, "应用2")).toBe(
      false
    );
  });
  it("should work with filterBySearch", () => {
    expect(filterBySearch(groupList, "modelC")).toEqual([
      {
        name: "应用资源",
        title: "应用资源",
        objectList: [{ name: "modelC", objectId: "C", category: "应用资源" }],
        subCategory: [],
      },
    ]);
    expect(filterBySearch(groupList, "")).toEqual(groupList);
  });
  it("function encode work", () => {
    expect(encode("]")).toEqual("\\]");
    expect(encode("*")).toEqual("\\*");
    expect(encode(")")).toEqual("\\)");
    expect(encode("$")).toEqual("\\$");
    expect(encode("?")).toEqual("\\?");
    expect(encode("}")).toEqual("\\}");
    expect(encode("+")).toEqual("\\+");
    expect(encode("^")).toEqual("\\^");
  });
});
describe("RenderName", () => {
  it("should work", () => {
    const wrapper = mount(<RenderName name="abc" />);
    expect(wrapper.find("span")).toHaveLength(1);
    expect(wrapper.text()).toEqual("abc");
  });
  it("should work", () => {
    const wrapper = mount(<RenderName name="abcABCDefg" highlightChar="bc" />);
    const splits = wrapper.find("span");
    expect(splits).toHaveLength(5);
    expect(splits.at(0).text()).toEqual("a");
    expect(splits.at(1).text()).toEqual("bc");
    expect(splits.at(2).text()).toEqual("A");
    expect(splits.at(3).text()).toEqual("BC");
    expect(splits.at(4).text()).toEqual("Defg");
    expect(splits.at(1).hasClass("highlightText")).toBe(true);
  });
});
describe("getNewFavouriteList", () => {
  expect(getNewFavouriteList("APP", ["APP", "HOST", "CLUSTER"], true)).toEqual([
    "APP",
    "HOST",
    "CLUSTER",
  ]);
  expect(getNewFavouriteList("APP", ["APP", "HOST", "CLUSTER"], false)).toEqual(
    ["HOST", "CLUSTER"]
  );
  expect(
    getNewFavouriteList("AGENT", ["APP", "HOST", "CLUSTER"], true)
  ).toEqual(["APP", "HOST", "CLUSTER", "AGENT"]);
});
