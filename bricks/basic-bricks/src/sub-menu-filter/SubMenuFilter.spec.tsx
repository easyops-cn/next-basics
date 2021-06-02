import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import { SubMenuFilter, SubMenuFilterProps } from "./SubMenuFilter";
import { Menu, Input } from "antd";
import * as kit from "@next-core/brick-kit";

jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {
    search: "",
  },
  replaceQuery: jest.fn(),
} as any);

jest.spyOn(kit, "BrickAsComponent").mockImplementation(() => {
  return <div>FakeBrickAsComponent</div>;
});
describe("SubMenuFilter", () => {
  const props: SubMenuFilterProps = {
    multiple: true,
    defaultOpenKeys: ["diy"],
    defaultSelectedKeys: ["C++"],
    inlineIndent: 12,
    menuItems: [
      {
        type: "item",
        title: "全部",
        key: "All",
        count: 100,
        icon: {
          lib: "fa",
          icon: "cube",
        },
      },
      {
        type: "group",
        title: "内置模板",
        key: "built-in-template",
        items: [
          {
            title: "Java",
            key: "Java",
            count: 60,
            icon: {
              lib: "easyops",
              category: "model",
              icon: "java",
            },
          },
          {
            title: "Go",
            key: "Go",
            count: 10,
            icon: {
              lib: "easyops",
              category: "model",
              icon: "go",
            },
          },
          {
            title: "Cc",
            key: "cc",
            count: 10,
            icon: {
              lib: "easyops",
              category: "model",
              icon: "go",
            },
          },
          {
            title: "Python",
            key: "Python",
            count: 10,
            icon: {
              lib: "fa",
              icon: "cube",
            },
          },
        ],
      },
      {
        type: "group",
        title: "自定义模板",
        key: "customTemplate",
        items: [
          {
            type: "subMenu",
            title: "标准模板",
            key: "standard",
            icon: {
              lib: "easyops",
              category: "model",
              icon: "app",
            },
            items: [
              {
                title: "C++",
                key: "C++",
                count: 5,
                icon: {
                  lib: "easyops",
                  category: "model",
                  icon: "cpp",
                },
              },
              {
                title: "C",
                key: "C",
                count: 5,
                icon: {
                  lib: "easyops",
                  category: "model",
                  icon: "c",
                },
              },
              {
                title: "b",
                key: "b",
                count: 5,
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
              },
            ],
          },
          {
            type: "subMenu",
            title: "个性化模板c",
            key: "diy",
            icon: {
              lib: "fa",
              icon: "cube",
            },
            items: [
              {
                title: "易语言",
                key: "iyuyan",
                count: 10,
                icon: {
                  lib: "fa",
                  icon: "cube",
                },
              },
            ],
          },
        ],
      },
    ],
    onSearch: jest.fn(),
    onSelect: jest.fn(),
  };
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<SubMenuFilter {...props} />);
  });

  it("should work", () => {
    expect(wrapper.find(".transparentBackground").length).toBe(0);
    wrapper.setProps({
      transparentBackground: true,
      suffixBrick: {
        useBrick: {
          brick: "div",
          transform: {
            titleContent: "@{count}",
          },
        },
      },
    });
    wrapper.update();

    expect(wrapper.find(".transparentBackground").length).toBe(1);
    expect(wrapper.find(Menu.ItemGroup).length).toBe(2);
    expect(wrapper.find(Menu.SubMenu).length).toBe(2);
    expect(wrapper.find(Menu.Item).length).toBe(6);
    expect(wrapper.find(Menu).prop("inlineIndent")).toBe(12);
    expect(wrapper.find(Menu).prop("openKeys")).toEqual(["diy"]);

    expect(
      wrapper
        .find("div")
        .map((node) => node)
        .filter((node) => node.text() === "FakeBrickAsComponent").length
    ).toBe(6);
  });

  it("should call onSearch ", () => {
    wrapper.setProps({ placeholder: "fakePlaceholder" });
    wrapper.update();
    const searchInput = wrapper.find(Input.Search);
    expect(searchInput.prop("placeholder")).toBe("fakePlaceholder");

    searchInput.invoke("onSearch")("c");
    expect(props.onSearch).toHaveBeenLastCalledWith("c");

    searchInput.invoke("onSearch")("");
    const menu = wrapper.find(Menu);
    expect(menu.prop("openKeys")).toEqual(props.defaultOpenKeys);

    menu.invoke("onOpenChange")(["diy", "standard"]);
    wrapper.update();
    expect(wrapper.find(Menu).prop("openKeys")).toEqual(["diy", "standard"]);
  });

  it("should call onSelect", async () => {
    wrapper.setProps({
      selectable: true,
    });
    wrapper.update();
    const menu = wrapper.find(Menu);
    menu.invoke("onSelect")({ key: "cc" });
    await (global as any).flushPromises();
    expect(props.onSelect).toHaveBeenCalledWith([
      {
        title: "C++",
        key: "C++",
        count: 5,
        icon: {
          lib: "easyops",
          category: "model",
          icon: "cpp",
        },
      },
      {
        title: "Cc",
        key: "cc",
        count: 10,
        icon: {
          lib: "easyops",
          category: "model",
          icon: "go",
        },
      },
    ]);
    // call deselect function
    menu.invoke("onDeselect")({ key: "Cc" });
    await (global as any).flushPromises();
    expect(props.onSelect).toHaveBeenLastCalledWith([
      {
        title: "C++",
        key: "C++",
        count: 5,
        icon: {
          lib: "easyops",
          category: "model",
          icon: "cpp",
        },
      },
    ]);
  });
});
