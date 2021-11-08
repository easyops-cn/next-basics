import React from "react";
import { mount } from "enzyme";
import { Cascader } from "antd";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { GeneralCascader } from "./GeneralCascader";

describe("GeneralCascader", () => {
  it("should work", () => {
    const changeMock = jest.fn();
    const props = {
      fieldNames: { label: "label", value: "value", children: "children" },
      showSearch: true,
      suffixIcon: "search",
      onChange: changeMock,
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
      ],
    };
    const wrapper = mount(<GeneralCascader {...props} />);

    expect(wrapper.find(LegacyIcon).prop("type")).toEqual("search");

    wrapper.find(Cascader).invoke("onChange")(
      ["zhejiang", "hangzhou", "xihu"],
      [{}]
    );
    expect(changeMock.mock.calls[0][0]).toEqual([
      "zhejiang",
      "hangzhou",
      "xihu",
    ]);

    wrapper.find("input").invoke("onChange")({ target: { value: "Jiangsu" } });
    wrapper.find("Trigger").simulate("click");
    wrapper.update();

    expect(wrapper.find(".ant-cascader-menu-item-keyword").text()).toEqual(
      "Jiangsu"
    );
    wrapper.setProps({
      name: "cascader",
      formElement: {
        formUtils: {
          getFieldDecorator: () => (comp: React.Component) => comp,
        },
      },
    });
  });

  it("custom display value", () => {
    const props = {
      fieldNames: { label: "label", value: "value", children: "children" },
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          isLeaf: false,
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          isLeaf: false,
        },
      ],
      value: ["zhejiang", "hanzhou"],
    };
    const wrapper = mount(<GeneralCascader {...props} />);
    expect(wrapper.find(".ant-cascader-picker-label").text()).toEqual(
      "Zhejiang / hanzhou"
    );
  });

  it("custom display value with formElement wrapper", async () => {
    const props = {
      fieldNames: { label: "label", value: "value", children: "children" },
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          isLeaf: false,
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          isLeaf: false,
        },
      ],
    };
    const wrapper = mount(<GeneralCascader {...props} />);

    wrapper.setProps({
      name: "city",
      formElement: {
        formUtils: {
          getFieldDecorator: () => (comp: React.Component) => comp,
          getFieldValue: jest.fn().mockReturnValue(["jiangsu", "nanjing"]),
        },
      },
    });

    const result = wrapper.find(Cascader).invoke("displayRender")(
      ["jiangshu"],
      [
        {
          value: "jiangsu",
          label: "Jiangsu",
          isLeaf: false,
        },
      ]
    );

    expect(result).toEqual("Jiangsu / nanjing");
  });

  it("should dynamic loading data", () => {
    const mockLoadingFn = jest.fn();
    const ref: React.Ref<any> = React.createRef();
    const props = {
      fieldNames: { label: "label", value: "value", children: "children" },
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          isLeaf: false,
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          isLeaf: false,
        },
      ],
      value: ["zhejiang", "hanzhou"],
    };
    const wrapper = mount(
      <GeneralCascader {...props} onLoadingData={mockLoadingFn} ref={ref} />
    );

    wrapper.find(Cascader).invoke("loadData")([
      {
        value: "zhejiang",
        label: "Zhejiang",
        isLeaf: false,
      },
    ]);

    expect(mockLoadingFn).toHaveBeenCalledWith([
      {
        value: "zhejiang",
        label: "Zhejiang",
        isLeaf: false,
        loading: true,
      },
    ]);

    ref.current.setChildrenOption(
      {
        selectedOptions: [
          {
            value: "zhejiang",
            label: "Zhejiang",
            isLeaf: false,
          },
        ],
      },
      [
        { name: "nanjing", label: "Nanjing" },
        { name: "ningbo", value: "Ningbo" },
      ]
    );
    wrapper.update();
    expect(wrapper.find(Cascader).prop("options")).toEqual([
      {
        children: [
          { label: "Nanjing", name: "nanjing" },
          { name: "ningbo", value: "Ningbo" },
        ],
        isLeaf: false,
        label: "Zhejiang",
        loading: false,
        value: "zhejiang",
      },
      { isLeaf: false, label: "Jiangsu", value: "jiangsu" },
    ]);
  });
});
