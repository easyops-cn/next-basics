import React from "react";
import { shallow, mount } from "enzyme";
import { BrickTag, TagTypeProps, circleIcon } from "./BrickTag";
import { GeneralIcon } from "@next-libs/basic-components";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Tooltip } from "antd";

describe("BrickTag", () => {
  it("should work when componentType is CheckableTag", () => {
    const handleOnChange = jest.fn();
    const props = {
      componentType: TagTypeProps.CheckableTag,
      configProps: {
        color: "#108ee9",
      },
      textEllipsis: true,
      tagStyle: {
        color: "#fff",
      },
      tagCheckedStyle: {
        color: "#ccc",
      },
      tagHoverStyle: {
        color: "red",
      },
      defaultCheckedTag: "b",
      handleOnChange,
      multipleCheck: true,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
        { key: "d", label: "d" },
      ],
      label: "label: ",
    };
    const wrapper = mount(<BrickTag {...props} />);
    expect(wrapper.find("CheckableTag").length).toEqual(4);
    wrapper.find("CheckableTag").at(0).simulate("mouseenter");
    expect(wrapper.find("CheckableTag").at(0).prop("style").color).toBe("red");
    wrapper.find("CheckableTag").at(0).simulate("mouseleave");
    expect(wrapper.find("CheckableTag").at(0).prop("style").color).toBe("#fff");
    wrapper.find("CheckableTag").at(0).invoke("onChange")(true);
    expect(handleOnChange).toHaveBeenCalled();
    wrapper.setProps({
      defaultCheckedTag: ["a"],
    });
    wrapper.update();
    expect(wrapper.find("CheckableTag").at(0).prop("checked")).toBe(true);

    wrapper.setProps({
      multipleCheck: false,
    });
    wrapper.update();

    wrapper.find("CheckableTag").at(1).invoke("onChange")(true);
    expect(handleOnChange).toHaveBeenCalled();
    wrapper.setProps({
      defaultCheckedTag: ["b"],
    });
    wrapper.update();
    expect(wrapper.find("CheckableTag").at(0).prop("checked")).toBe(false);
    expect(wrapper.find("CheckableTag").at(1).prop("checked")).toBe(true);
  });
  it("should work when Tag has TagCircle", () => {
    const props = {
      showTagCircle: true,
      componentType: TagTypeProps.Tag,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
        { key: "d", label: "d" },
      ],
    };
    const wrapper = shallow(<BrickTag {...props} />);
    expect(wrapper.find("Tag").at(1).find(GeneralIcon).prop("icon")).toEqual(
      circleIcon
    );
  });
  it("should work when Tag has icon", () => {
    const adIcon = {
      lib: "fa",
      icon: "ad",
      prefix: "fas",
    };
    const props = {
      componentType: TagTypeProps.Tag,
      tagList: [
        { key: "a", label: "a", icon: "search" },
        { key: "b", label: "b", icon: adIcon },
      ],
    };
    const wrapper = shallow(<BrickTag {...props} />);
    expect(wrapper.find("Tag").at(0).find(LegacyIcon).prop("type")).toEqual(
      "search"
    );
    expect(wrapper.find("Tag").at(1).find(GeneralIcon).prop("icon")).toEqual(
      adIcon
    );
  });
  it("should work when shape is round", () => {
    const props = {
      shape: "round",
      showTagCircle: true,
      componentType: TagTypeProps.Tag,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
        { key: "d", label: "d" },
      ],
    };
    const wrapper = shallow(<BrickTag {...props} />);
    expect(wrapper.find(".round")).toHaveLength(4);
  });

  it("should work with specific color and disabledTooltip and disabled in tagList", () => {
    const props = {
      componentType: TagTypeProps.Tag,
      color: "red",
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b", color: "gray-inverse" },
        { key: "c", label: "c", color: "gray" },
        { key: "d", label: "d", disabled: true, disabledTooltip: "禁用标签" },
      ],
    };
    const wrapper = shallow(<BrickTag {...props} />);
    expect(wrapper.find("Tag")).toHaveLength(4);
    expect(wrapper.find("Tag").at(0).prop("color")).toBe("red");
    expect(wrapper.find("Tag").at(2).prop("color")).toBe("gray");
    expect(wrapper.find("Tag").at(2).hasClass("grayTag")).toBe(true);
    expect(wrapper.find("Tag").at(1).hasClass("grayInverseTag")).toBe(true);
    expect(wrapper.find("Tooltip")).toHaveLength(1);
  });

  it("should work when Tag is closable", () => {
    const handleOnClose = jest.fn();
    const props = {
      closable: true,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
        { key: "d", label: "d" },
        { key: "e", label: "e", disabled: true },
      ],
      handleOnClose,
    };
    const wrapper = mount(<BrickTag {...props} />);
    expect(wrapper.find("Tag").length).toEqual(5);
    expect(
      wrapper.find("Tag").at(0).find("span.anticon-close.ant-tag-close-icon")
        .length
    ).toEqual(1);
    expect(
      wrapper.find("Tag").at(5).find("span.anticon-close.ant-tag-close-icon")
    ).toEqual({});
    wrapper
      .find("Tag")
      .at(0)
      .find("span.anticon-close.ant-tag-close-icon")
      .simulate("click");
    expect(handleOnClose).toHaveBeenCalled();
  });

  it("should work when cancelable is false", () => {
    const handleOnChange = jest.fn();
    const props = {
      componentType: TagTypeProps.CheckableTag,
      handleOnChange,
      multipleCheck: false,
      cancelable: false,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
      ],
    };
    const wrapper = mount(<BrickTag {...props} />);
    expect(wrapper.find("CheckableTag").length).toEqual(3);
    wrapper.find("CheckableTag").at(0).invoke("onChange")(true);
    expect(handleOnChange).toBeCalled();
    handleOnChange.mockClear();
    wrapper.find("CheckableTag").at(0).invoke("onChange")(false);
    expect(handleOnChange).not.toBeCalled();
  });

  it("should support tooltip", () => {
    const tooltip = "tip content";
    const props = {
      tagList: [{ key: "a", label: "a", tooltip }],
    };
    const wrapper = mount(<BrickTag {...props} />);

    const tooltipNode = wrapper.find(Tooltip);
    expect(tooltipNode).toHaveLength(1);
    expect(tooltipNode.prop("title")).toBe(tooltip);
  });
});
