import React from "react";
import { shallow } from "enzyme";
import { ProviderSample } from "./ProviderSample";
import { Select, message } from "antd";
import { Clipboard } from "@next-libs/clipboard";

describe("ProviderSample", () => {
  it("should work", () => {
    const spyonMessage = jest.spyOn(message, "success");
    const examples = [
      {
        description: {
          en: "Basic",
          zh: "基础请求",
        },
        request: {
          method: "POST",
          uri: "/api/v2/next-builder/storiesjson",
          headers: {
            "Content-Type": "application/json",
          },
          body: '{\n  "storyIds": [\n    "basic-bricks.general-link"\n  ],\n  "fields": [\n    "label",\n    "url",\n    "description"\n  ]\n}',
        },
        response: {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: '{\n  "code": 0,\n  "codeExplain": "",\n  "error": "",\n  "data": {\n    "list": [\n      {\n        "author": "easyops",\n        "description": {\n          "en": "General Link",\n          "zh": "通用链接"\n        },\n        "id": "basic-bricks.general-link"\n      }\n    ]\n  }\n}',
        },
      },
      {
        description: {
          en: "With Query",
          zh: "带查询条件",
        },
        request: {
          method: "POST",
          uri: "/api/v2/next-builder/storiesjson",
          headers: {
            "Content-Type": "application/json",
          },
          body: '{\n  "storyIds": [\n    "basic-bricks.general-button"\n  ],\n  "fields": [\n    "id",\n    "author",\n    "description"\n  ]\n}',
        },
        response: {
          body: '{\n  "code": 0,\n  "codeExplain": "",\n  "error": "",\n  "data": {\n    "list": [\n      {\n        "author": "jo",\n        "description": {\n          "en": "General button",\n          "zh": "可发送点击事件、可配置按钮名称、按钮跳转链接等"\n        },\n        "id": "basic-bricks.general-button"\n      }\n    ]\n  }\n}',
        },
      },
    ];
    const wrapper = shallow(
      <ProviderSample
        examples={examples}
        endpoint="POST /api/v2/next-builder/storiesjson"
      />
    );

    expect(wrapper.find(".title").length).toEqual(2);

    expect(wrapper.find(Clipboard).at(0).prop("text")).toEqual(
      "POST /api/v2/next-builder/storiesjson"
    );

    wrapper.find(Clipboard).at(0).invoke("onCopy")("some text", true);

    expect(spyonMessage).toHaveBeenCalled();

    expect(wrapper.find(Clipboard).at(1).prop("text")).toEqual(
      '{\n  "storyIds": [\n    "basic-bricks.general-link"\n  ],\n  "fields": [\n    "label",\n    "url",\n    "description"\n  ]\n}'
    );

    wrapper.find(Select).invoke("onChange")(1, null);

    wrapper.update();
    expect(wrapper.find(Clipboard).at(1).prop("text")).toEqual(
      '{\n  "storyIds": [\n    "basic-bricks.general-button"\n  ],\n  "fields": [\n    "id",\n    "author",\n    "description"\n  ]\n}'
    );
  });

  it("should work with empty data", () => {
    const wrapper = shallow(<ProviderSample endpoint="" />);
    expect(wrapper.find(Select).length).toEqual(1);
  });
});
