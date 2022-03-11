import React from "react";
import { shallow, mount } from "enzyme";
import { DynamicFormItemV2 } from "./DynamicFormItemV2";
import { Column } from "../interfaces";

const columns = [
  {
    name: "input",
    label: "input",
    type: "input",
    props: {
      placeholder: "input",
    },
  },
  {
    name: "select",
    label: "select",
    type: "select",
    props: {
      options: [{ label: "a", value: "a" }],
    },
  },
] as Column[];

describe("DynamicFormItemV2", () => {
  it("should work", () => {
    const onChange = jest.fn();
    const onAdd = jest.fn();
    const onRemove = jest.fn();
    const wrapper = mount(
      <DynamicFormItemV2
        columns={columns}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    );

    expect(wrapper.find("Row.row")).toHaveLength(0);

    wrapper.find(".addRowBtn").at(0).simulate("click");
    expect(wrapper.find("Row.row")).toHaveLength(1);
    expect(wrapper.find("Row.row").find("ColumnComponent")).toHaveLength(2);
    expect(onChange).lastCalledWith([{}]);
    expect(onAdd).lastCalledWith({ detail: {}, index: 0 });

    wrapper.find(".removeRowBtn").at(0).simulate("click");
    expect(wrapper.find("Row.row")).toHaveLength(0);
    expect(onChange).lastCalledWith([]);
    expect(onRemove).lastCalledWith({ detail: {}, index: 0 });
  });

  it("disabled & hide button should work", () => {
    const onChange = jest.fn();
    const onAdd = jest.fn();
    const onRemove = jest.fn();
    const wrapper = mount(
      <DynamicFormItemV2
        columns={columns}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    );
    wrapper.find(".addRowBtn").at(0).simulate("click");
    expect(wrapper.find(".addRowBtn.displayNone")).toHaveLength(0);
    expect(wrapper.find(".addRowBtn[disabled=true]")).toHaveLength(0);
    expect(wrapper.find(".removeRowBtn.hidden")).toHaveLength(0);
    expect(wrapper.find(".removeRowBtn[disabled=true]")).toHaveLength(0);

    wrapper.setProps({
      hideAddButton: true,
      disabledAddButton: true,
      hideRemoveButton: true,
      disabledRemoveButton: true,
    });
    expect(wrapper.find(".addRowBtn.displayNone")).not.toHaveLength(0);
    expect(wrapper.find(".addRowBtn[disabled=true]")).not.toHaveLength(0);
    expect(wrapper.find(".removeRowBtn.hidden")).not.toHaveLength(0);
    expect(wrapper.find(".removeRowBtn[disabled=true]")).not.toHaveLength(0);
  });
});
