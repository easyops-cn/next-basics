import React from "react";
import { mount } from "enzyme";
import { Select, Modal } from "antd";
import { PasteableSelect } from "./PasteableSelect";

describe("PasteableSelect", () => {
  const defaultOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "100", value: 100 },
  ];

  it("should render correctly", () => {
    const wrapper = mount(<PasteableSelect options={defaultOptions} />);
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it("should parse pasted text correctly (multiple mode)", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <PasteableSelect
        mode="multiple"
        options={defaultOptions}
        onChange={onChange}
      />
    );

    // 模拟粘贴事件
    const pasteEvent = {
      clipboardData: {
        getData: () => "apple, banana\n100",
      },
      preventDefault: jest.fn(),
    };

    wrapper.find("div").at(0).simulate("paste", pasteEvent);

    expect(onChange).toBeCalledWith("apple,banana,100");
  });

  it("should show Modal.warning for invalid items", () => {
    const modalSpy = jest.spyOn(Modal, "warning");
    const wrapper = mount(
      <PasteableSelect mode="multiple" options={defaultOptions} />
    );

    const pasteEvent = {
      clipboardData: {
        getData: () => "invalid_item",
      },
      preventDefault: jest.fn(),
    };

    wrapper.find("div").at(0).simulate("paste", pasteEvent);

    // 验证是否弹窗
    expect(modalSpy).toBeCalled();
    modalSpy.mockRestore();
  });

  it("should support tags mode without warning", () => {
    const onChange = jest.fn();
    const modalSpy = jest.spyOn(Modal, "warning");
    const wrapper = mount(
      <PasteableSelect
        mode="tags"
        options={defaultOptions}
        onChange={onChange}
      />
    );

    const pasteEvent = {
      clipboardData: {
        getData: () => "new_tag",
      },
      preventDefault: jest.fn(),
    };

    wrapper.find("div").at(0).simulate("paste", pasteEvent);

    // Tags 模式下不应该弹窗，且允许新数据
    expect(modalSpy).not.toBeCalled();
    expect(onChange).toBeCalledWith("new_tag");
    modalSpy.mockRestore();
  });

  it("should handle number type casting correctly", () => {
    const onChange = jest.fn();
    // 强制第一个 option 是 number 类型
    const numberOptions = [{ label: "One", value: 1 }];
    const wrapper = mount(
      <PasteableSelect
        mode="multiple"
        options={numberOptions}
        onChange={onChange}
      />
    );

    // 模拟 Antd 的 Select 触发 onChange (数组形式)
    const antdSelect = wrapper.find(Select);
    antdSelect.prop("onChange")([1, "2"]);

    // 验证 internalValue 转换逻辑：将数组 join 传回
    expect(onChange).toBeCalledWith("1,2");
  });
});
