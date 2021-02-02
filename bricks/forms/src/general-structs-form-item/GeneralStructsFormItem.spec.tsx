import React from "react";
import { shallow } from "enzyme";
import { GeneralStructsFormItem } from "./GeneralStructsFormItem";
import { Table, Modal } from "antd";
describe("GeneralStructsFormItem", () => {
  it("should work", () => {
    const props = {
      dataSource: [
        {
          name: "param1",
          type: "string",
          description: "参数说明1"
        },
        {
          name: "param2",
          type: "int",
          description: "参数说明2"
        }
      ],
      fieldsMap: {
        name: "参数名",
        type: "参数类型",
        description: "参数说明"
      }
    };
    const wrapper = shallow(<GeneralStructsFormItem {...props} />);
    expect(wrapper.find(Table).prop("columns")[0]).toEqual({
      dataIndex: "name",
      key: "name",
      title: "参数名"
    });
  });
});
