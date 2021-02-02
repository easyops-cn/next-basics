import React from "react";
import { shallow } from "enzyme";
import { BrickValueMapping, circleIcon } from "./BrickValueMapping";
import { Color, MappingValue } from "./index";
import { GeneralIcon } from "@next-libs/basic-components";

describe("BrickValueMapping", () => {
  it("should work", () => {
    const value = "0";
    const mapping: Record<string, MappingValue> = {
      "0": { text: "开发", color: Color.gray },
      "1": { color: Color.blue },
    };
    const wrapper = shallow(
      <BrickValueMapping value={value} mapping={mapping} showTagCircle={true} />
    );
    wrapper.setProps({ value: 1 });
    expect(wrapper.find("Tag").props().color).toBe("blue");
  });

  it("color tag should work", () => {
    const props = {
      mapping: {
        "0": {
          color: "red-inverse",
          text: "禁用",
        },
        "1": {
          color: "green",
          text: "启用",
        },
      },
      showTagCircle: true,
      value: 1,
    };
    const wrapper = shallow(<BrickValueMapping {...props} />);
    expect(wrapper.find("Tag").props().color).toBe(Color.green);
    expect(wrapper.find("Tag").find(GeneralIcon).prop("icon")).toEqual(
      circleIcon
    );
    wrapper.setProps({ value: 0 });
    wrapper.update();
    expect(wrapper.find("Tag").props().color).toBe(Color["red-inverse"]);
  });

  it("should work, value not match", () => {
    const value = "1";
    const mapping: Record<string, MappingValue> = {
      "0": { text: "开发", color: Color.blue },
      "*": { text: "xx" },
    };
    const wrapper = shallow(
      <BrickValueMapping value={value} mapping={mapping} />
    );
    expect(wrapper.find("span").last().text()).toBe("1");
  });

  it("should work, mapping is empty", () => {
    const value = "1";
    const wrapper = shallow(<BrickValueMapping value={value} mapping={null} />);
    expect(wrapper.find("span").last().text()).toBe("1");
  });

  it("should work, value is empty", () => {
    let value: string;
    const wrapper = shallow(<BrickValueMapping value={value} mapping={{}} />);
    expect(wrapper.find("span").last().text()).toBe("");
  });

  it("should display text only, when showBg is false", () => {
    const value = "0";
    const mapping: Record<string, MappingValue> = {
      "0": { text: "开发", color: Color.blue },
      "1": { color: Color.blue },
    };
    const wrapper = shallow(
      <BrickValueMapping
        value={value}
        mapping={mapping}
        showBg={false}
        showTagCircle={false}
      />
    );
    expect(wrapper.find("label").exists()).toBeFalsy();
  });

  it("should display '无', when value is '-1'", () => {
    const value = "-1";
    const mapping: Record<string, MappingValue> = {
      "-1": {
        text: "无",
        color: Color.gray,
      },
      "0": { text: "开发", color: Color.blue },
      "1": { color: Color.blue },
    };
    const wrapper = shallow(
      <BrickValueMapping
        value={value}
        mapping={mapping}
        showBg={false}
        showTagCircle={false}
      />
    );
    expect(wrapper.text()).toBe("无");
  });

  it("map icon should work", () => {
    const value = "0";
    const mapping: Record<string, MappingValue> = {
      "0": {
        text: "开发",
        color: Color.blue,
        icon: { lib: "fa", icon: "tree" },
      },
    };

    const wrapper = shallow(
      <BrickValueMapping value={value} mapping={mapping} />
    );
    expect(wrapper.find("GeneralIcon")).toBeTruthy();
  });

  it("re mapping should work", () => {
    const value = "hello";
    const mapping: Record<string, MappingValue> = {
      ".*": {
        text: "开发",
        color: Color.blue,
        icon: { lib: "fa", icon: "tree" },
      },
    };

    const wrapper = shallow(
      <BrickValueMapping value={value} mapping={mapping} />
    );
    expect(wrapper.find("GeneralIcon")).toBeTruthy();
  });

  it("should work when shape is round", () => {
    const value = "0";
    const mapping: Record<string, MappingValue> = {
      "0": {
        text: "开发",
        color: Color.blue,
      },
    };

    const wrapper = shallow(
      <BrickValueMapping value={value} mapping={mapping} shape="round" />
    );
    expect(wrapper.find(".round").length).toBe(1);
  });

  it("link should work", () => {
    const value = "hello";
    const mapping: Record<string, MappingValue> = {
      ".*": {
        text: "开发",
        color: Color.blue,
        icon: { lib: "fa", icon: "tree" },
      },
    };

    const wrapper = shallow(
      <BrickValueMapping
        value={value}
        mapping={mapping}
        shape="round"
        link={{ to: "" }}
      />
    );
    expect(wrapper.find("Link").length).toBe(1);
  });

  it("fireEvent should work", () => {
    const fn = jest.fn();
    const value = "hello";
    const mapping: Record<string, MappingValue> = {
      ".*": {
        text: "开发",
        color: Color.blue,
        icon: { lib: "fa", icon: "tree" },
      },
    };

    const wrapper = shallow(
      <BrickValueMapping
        value={value}
        mapping={mapping}
        shape="round"
        handleClick={fn}
      />
    );

    let brick = wrapper.find("span").first();
    brick.simulate("click");
    expect(fn).not.toBeCalled();

    wrapper.setProps({ triggerClickEvent: true });
    brick = wrapper.find("span").first();
    brick.simulate("click", new MouseEvent(""));
    expect(fn).toBeCalled();
  });
});
