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
  });
});
