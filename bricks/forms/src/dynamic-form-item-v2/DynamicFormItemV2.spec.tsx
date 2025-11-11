import React from "react";
import { shallow, mount } from "enzyme";
import { DynamicFormItemV2 } from "./DynamicFormItemV2";
import { Column } from "../interfaces";
import { cloneDeep } from "lodash";
import * as excelUtilsModule from "./excelUtils";

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
    expect(wrapper.find("Row.row .inLabelRow")).toHaveLength(columns.length);
    expect(wrapper.find("Row.row").find("ColumnComponent")).toHaveLength(2);
    expect(onChange).lastCalledWith([{}]);
    expect(onAdd).lastCalledWith({ detail: {}, index: 0 });

    wrapper.find(".removeRowBtn").at(0).simulate("click");
    expect(wrapper.find("Row.row")).toHaveLength(0);
    expect(onChange).lastCalledWith([]);
    expect(onRemove).lastCalledWith({ detail: {}, index: 0 });

    const _columns = cloneDeep(columns);
    _columns[0].defaultValue = "a";
    wrapper.setProps({ columns: _columns });
    wrapper.update();
    wrapper.find(".addRowBtn").at(0).simulate("click");
    expect(onAdd).lastCalledWith({
      detail: { input: "a", select: undefined },
      index: 0,
    });
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
    expect(wrapper.find(".removeRowBtn[disabled=true]")).toHaveLength(0);

    wrapper.setProps({
      hideAddButton: true,
      disabledAddButton: true,
      hideRemoveButton: true,
      disabledRemoveButton: true,
    });
    expect(wrapper.find(".addRowBtn.displayNone")).not.toHaveLength(0);
    expect(wrapper.find(".addRowBtn[disabled=true]")).not.toHaveLength(0);
    expect(wrapper.find(".removeRowBtn[disabled=true]")).not.toHaveLength(0);
  });

  it("import export button should work", () => {
    const onChange = jest.fn();
    const onAdd = jest.fn();
    const onRemove = jest.fn();
    const wrapper = mount(
      <DynamicFormItemV2
        columns={columns}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        showImportExport={true}
        label="动态表单项"
        exportExamples={[
          { input: "a", select: "a" },
          { input: "b", select: "b" },
        ]}
      />
    );
    expect(wrapper.find(".importExportButtons")).toHaveLength(1);
    expect(wrapper.find(".importExportButtons a")).toHaveLength(2);

    // Test export functionality
    const exportToExcelMock = jest
      .spyOn(excelUtilsModule, "exportToExcel")
      .mockImplementation(() => {
        return;
      });
    const exportTemplateBtn = wrapper.find(".importExportButtons a").at(0);
    exportTemplateBtn.simulate("click");
    expect(exportToExcelMock).toHaveBeenCalledWith(
      columns,
      "动态表单项_forms:TEMPLATE",
      [
        { input: "a", select: "a" },
        { input: "b", select: "b" },
      ]
    );

    // Test import functionality
    const file = new File(["test content"], "test.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const importFromExcelMock = jest
      .spyOn(excelUtilsModule, "importFromExcel")
      .mockResolvedValue([{ name: "test", age: 25, isActive: true }]);

    const importBtn = wrapper.find(".importExportButtons a").at(1);
    importBtn.simulate("click");
    const fileInput = wrapper.find('input[type="file"]');
    fileInput.simulate("change", { target: { files: [file] } });

    expect(importFromExcelMock).toHaveBeenCalledWith(file, columns);

    // 测试导出数据功能
    const handleExportDataMock = jest
      .spyOn(excelUtilsModule, "exportFormData")
      .mockImplementation(() => {
        return;
      });

    const exportDataBtn = wrapper.find(".importExportButtons a").at(2);
    exportDataBtn.simulate("click");
    expect(handleExportDataMock).toHaveBeenCalledWith(
      columns,
      [],
      "动态表单项_forms:EXPORT_DATA"
    );

    wrapper.setProps({
      showImportExport: false,
    });
    expect(wrapper.find(".importExportButtons")).toHaveLength(0);
  });

  it("should work with grid layout", () => {
    const onChange = jest.fn();
    const onAdd = jest.fn();
    const onRemove = jest.fn();
    const wrapper = mount(
      <DynamicFormItemV2
        columns={columns}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        gridColumns={2}
      />
    );

    expect(wrapper.find("Row.row")).toHaveLength(0);

    wrapper.find(".addRowBtn").at(0).simulate("click");
    expect(wrapper.find("Row.row")).toHaveLength(1);
    expect(wrapper.find("Row.row .inLabelRow")).toHaveLength(0);
    expect(wrapper.find("Row.row .inGridLayout")).toHaveLength(columns.length);
    expect(wrapper.find("Row.row").find("ColumnComponent")).toHaveLength(2);
    expect(onChange).lastCalledWith([{}]);
    expect(onAdd).lastCalledWith({ detail: {}, index: 0 });

    wrapper.find(".addRowBtn").at(0).simulate("click");
    expect(wrapper.find("Row.row")).toHaveLength(2);
    expect(wrapper.find("Row.row .inGridLayout")).toHaveLength(
      columns.length * 2
    );
    expect(wrapper.find("Divider")).toHaveLength(1);
    expect(onChange).lastCalledWith([{}, {}]);
    expect(onAdd).lastCalledWith({ detail: {}, index: 1 });
  });
});
