import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DropdownSelect } from "./DropdownSelect";

const props = {
  dataSource: [
    {
      label: "label1",
      value: "value1",
      desc: "desc1",
    },
    {
      label: "label2",
      value: "value2",
      desc: "desc2",
    },
  ],
  placeholder: "placeholder",
  label: "@@#{item.label}@@",
  optionTitle: "###{item.label}##",
  optionContent: "$$#{item.desc}$$",
  valuePath: "item.value",
};

afterEach(cleanup);

describe("DropdownSelect", () => {
  it("should work", () => {
    let _value;
    const mockOnChange = jest.fn((value, item) => {
      _value = value;
    });
    const { getByTestId, container, rerender } = render(
      <DropdownSelect
        {...props}
        value={_value}
        onChange={mockOnChange}
        tipBrick={{
          useBrick: {
            brick: "span",
          },
        }}
      />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger");
    let dropdownTriggerIcon = dropdownTrigger.querySelector(".anticon");
    expect(dropdownTrigger.querySelector(".placeholder")).toHaveTextContent(
      "placeholder"
    );
    expect(dropdownTriggerIcon).toHaveClass("anticon-caret-down");
    fireEvent.click(dropdownTrigger);
    dropdownTriggerIcon = dropdownTrigger.querySelector(".anticon");
    expect(dropdownTriggerIcon).toHaveClass("anticon-caret-up");
    const dropdownMenu =
      container.ownerDocument.querySelector(".ant-dropdown-menu");
    const item = props.dataSource[0];
    const optionEl = dropdownMenu.children[0];
    expect(optionEl.querySelector(".optionTitle")).toHaveTextContent(
      `##${item.label}##`
    );
    expect(optionEl.querySelector(".optionContent")).toHaveTextContent(
      `$$${item.desc}$$`
    );
    fireEvent.click(optionEl);
    expect(mockOnChange).toBeCalledWith(item.value, item);
    rerender(
      <DropdownSelect {...props} value={_value} onChange={mockOnChange} />
    );
    expect(
      dropdownTrigger.querySelector(".dropdownLabel").childNodes[0].textContent
    ).toEqual(`@@${item.label}@@`);
  });
  it("should work with dataSource", () => {
    let _value;
    const mockOnChange = jest.fn((value, item) => {
      _value = value;
    });
    const { getByTestId, container, rerender } = render(
      <DropdownSelect
        {...props}
        value={_value}
        onChange={mockOnChange}
        tipBrick={{
          useBrick: {
            brick: "span",
          },
        }}
        minSelectedItemLength={1}
        selectedKeys={[]}
        multipleLabel={"666"}
        multipleSelect={true}
        dropdownButtonType={"shape"}
      />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger-multiple");
    expect(
      dropdownTrigger.querySelector(".dropdownLabelBox").textContent
    ).toEqual("666");
  });

  it("should work with options", () => {
    const options = [
      {
        label: "label1",
        content: "content1",
        value: "value1",
      },
      {
        label: "label2",
        content: "content2",
        value: "value2",
      },
    ];
    const option = options[0];
    const value = option.value;
    const mockOnChange = jest.fn();
    const { getByTestId, container, rerender } = render(
      <DropdownSelect options={options} value={value} onChange={mockOnChange} />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger");
    expect(
      dropdownTrigger.querySelector(".dropdownLabel").childNodes[0].textContent
    ).toEqual(option.label);
    fireEvent.click(dropdownTrigger);
    const dropdownMenu =
      container.ownerDocument.querySelector(".ant-dropdown-menu");
    const optionEl = dropdownMenu.children[0];
    expect(optionEl.querySelector(".optionTitle")).toHaveTextContent(
      option.label
    );
    expect(optionEl.querySelector(".optionContent")).toHaveTextContent(
      option.content
    );
    fireEvent.click(optionEl);
    expect(mockOnChange).toBeCalledWith(option.value, option);
  });

  it("should work without options and dataSource", () => {
    const mockOnChange = jest.fn();
    const { getByTestId, container, rerender } = render(
      <DropdownSelect options={[]} dataSource={[]} onChange={mockOnChange} />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger");
    fireEvent.click(dropdownTrigger);
    const dropdownMenu =
      container.ownerDocument.querySelector(".ant-dropdown-menu");
    expect(dropdownMenu).toBe(null);
  });
  it("should work with selectTipText", () => {
    const mockOnChange = jest.fn();
    const { getByTestId, container, rerender } = render(
      <DropdownSelect
        options={[{ label: "测试", value: "test" }]}
        onChange={mockOnChange}
        selectTipText="测试下拉框文案"
      />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger");
    fireEvent.click(dropdownTrigger);
    const dropdownMenu =
      container.ownerDocument.querySelector(".ant-dropdown-menu");
    expect(dropdownMenu.children[0].textContent).toBe("测试下拉框文案");
    expect(
      dropdownMenu.children[1].querySelector(".optionTitle")
    ).toHaveTextContent("测试");
  });

  it("should work with multiple", () => {
    const options = [
      {
        label: "label1",
        content: "content1",
        value: "value1",
      },
      {
        label: "label2",
        content: "content2",
        value: "value2",
      },
    ];
    const option = options[0];
    const value = option.value;
    const mockOnChange = jest.fn();
    const { getByTestId, container, rerender } = render(
      <DropdownSelect
        options={options}
        multipleLabel={"666"}
        multipleSelect={true}
        dropdownButtonType={"shape"}
        value={value}
        onChange={mockOnChange}
        disabled={true}
        heightFix={true}
        buttonIcon={{
          lib: "antd",
          icon: "alert",
          theme: "twoTone",
        }}
        tipBrick={{
          useBrick: {
            brick: "span",
          },
        }}
      />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger-multiple");
    expect(
      dropdownTrigger.querySelector(".dropdownLabelBox").childNodes[0]
        .textContent
    ).toEqual("666");
  });
  it("should work with multiple", () => {
    const options = [
      {
        label: "label1",
        content: "content1",
        value: "value1",
      },
      {
        label: "label2",
        content: "content2",
        value: "value2",
      },
    ];
    const option = options[0];
    const value = option.value;
    const mockOnChange = jest.fn();
    const { getByTestId, container, rerender } = render(
      <DropdownSelect
        options={options}
        multipleLabel={"666"}
        multipleSelect={false}
        dropdownButtonType={"shape"}
        value={value}
        onChange={mockOnChange}
        disabled={false}
        heightFix={false}
        selectedKeys={[]}
        buttonIcon={{
          lib: "antd",
          icon: "alert",
          theme: "twoTone",
        }}
        tipBrick={{
          useBrick: {
            brick: "span",
          },
        }}
        hideLabel={true}
        dropdownTriggerStyle={{
          justifyContent: "end",
        }}
      />
    );
    const dropdownTrigger = getByTestId("dropdown-trigger-multiple");
    expect(
      dropdownTrigger.querySelector(".dropdownLabelBox").childNodes[0]
        .textContent
    ).toEqual("label1");
  });
});
