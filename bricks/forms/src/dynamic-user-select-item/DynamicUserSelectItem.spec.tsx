import React from "react";
import { mount } from "enzyme";
import { Form } from "@ant-design/compatible";
import { Select } from "antd";
import { DynamicUserSelectItem, RowFormItem } from "./DynamicUserSelectItem";
import { CmdbObjectApi } from "@sdk/cmdb-sdk";
import { columns } from "./";

jest.mock("@sdk/cmdb-sdk");
const onChangeMock = jest.fn();
const batchChangeMock = jest.fn();
const props = {
  prefixId: "dynamic[0]",
  row: {},
  columns,
  form: {
    getFieldDecorator: () => (comp: React.Component) => comp,
    getFieldValue: jest.fn().mockReturnValue({ dstObjectId: "HOST" }),
  },
  srcObjectId: "APP",
  onChange: onChangeMock,
  batchChange: batchChangeMock,
};

const mockGetObjectRef = jest
  .spyOn(CmdbObjectApi, "getObjectRef")
  .mockResolvedValue({
    data: [
      {
        name: "应用",
        objectId: "APP",
        relation_list: [],
      },
      {
        name: "主机",
        objectId: "HOST",
        relation_list: [
          {
            right_object_id: "USER",
            left_name: "左边",
            left_id: "left",
          },
        ],
      },
    ],
  } as any);
const mockGetObjectRelationRelatedKey = jest
  .spyOn(CmdbObjectApi, "getObjectRelationRelatedKey")
  .mockResolvedValue({
    data: [
      {
        reverseQueryKey: "111",
        id: "111",
        label: "1111",
      },
    ],
  } as any);

describe("DynamicUserSelectItem", () => {
  it("should work", () => {
    const wrapper = mount(<RowFormItem {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")("test", null);
    wrapper.find(Select).at(1).invoke("onChange")("test", null);
    expect(onChangeMock).toHaveBeenCalled();
    wrapper.find(Select).at(2).invoke("onChange")("test", null);
    expect(onChangeMock).toHaveBeenCalled();
  });
});
