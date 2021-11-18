import React from "react";
import { shallow, mount } from "enzyme";
import { GeneralStructsFormItem } from "./GeneralStructsFormItem";
import { Table, Modal } from "antd";
describe("GeneralStructsFormItem", () => {
  it("should work", () => {
    const props = {
      dataSource: [
        {
          name: "param1",
          type: "string",
          description: "参数说明1",
        },
        {
          name: "param2",
          type: "int",
          description: "参数说明2",
        },
      ],
      fieldsMap: {
        name: "参数名",
        type: "参数类型",
        description: "参数说明",
      },
    };
    const wrapper = shallow(<GeneralStructsFormItem {...props} />);
    expect(wrapper.find(Table).prop("columns")[0]?.title).toEqual("参数名");
  });

  it("structItemShowRenderFN should work", () => {
    const props = {
      dataSource: [
        {
          name: "param1",
          type: "string",
          description: "参数说明1",
        },
        {
          name: "param2",
          type: "int",
          description: "参数说明2",
        },
      ],
      fieldsMap: {
        name: "参数名",
        type: "参数类型",
        description: "参数说明",
      },
      structItemShowRenderFN: (text: string) => text + "***",
    };
    const wrapper = mount(<GeneralStructsFormItem {...props} />);
    expect(wrapper.find(Table).prop("columns")[0]?.render("test")).toEqual(
      "test***"
    );
  });

  it("structInnerTableColumnsOrder should work", () => {
    const props = {
      dataSource: [
        {
          name: "param1",
          type: "string",
          description: "参数说明1",
        },
        {
          name: "param2",
          type: "int",
          description: "参数说明2",
        },
      ],
      fieldsMap: {
        name: "参数名",
        type: "参数类型",
        description: "参数说明",
      },
      structInnerTableColumnsOrder: ["type", "name", "description"],
    };
    const wrapper = mount(<GeneralStructsFormItem {...props} />);
    expect(wrapper.find(Table).prop("columns")[0].key).toEqual("type");
  });
});
