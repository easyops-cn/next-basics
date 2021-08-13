import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Table } from "antd";
import { FieldsMappingEditor } from "./FieldsMappingEditor";

jest.mock("@next-libs/code-editor-components", () => ({
  CodeEditorItem: function CodeEditorItemWrapper() {
    return <div>editor item</div>;
  },
}));

describe("FieldsMappingEditor", () => {
  it("should work", async () => {
    const props = {
      dataSource: [
        { name: "objectId", type: "string", description: "objectId", key: "0" },
        { name: "query", type: "map", description: "query", key: "1" },
        {
          name: "only_my_instance",
          type: "bool",
          description: "我的实例",
          key: "2",
        },
        {
          name: "metrics_filter",
          type: "object",
          key: "3",
          fields: [
            {
              name: "time_range",
              type: "object",
              key: "3-0",
              fields: [
                {
                  name: "start_time",
                  type: "int",
                  description: "start_time",
                  key: "3-0-0",
                },
                {
                  name: "end_time",
                  type: "int",
                  description: "end_time",
                  key: "3-0-1",
                },
              ],
              description: "时间范围",
            },
          ],
          description: "指标过滤",
        },
      ],
    };
    const wrapper = mount(<FieldsMappingEditor {...props} />);
    act(() => {
      wrapper.find('[test-id="edit-btn"]').at(0).simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("CodeEditorItemWrapper").length).toEqual(1);
    wrapper.find("CodeEditorItemWrapper").invoke("onChange")("APP");
    act(() => {
      wrapper.find('[test-id="save-btn"]').at(0).simulate("click");
    });

    act(() => {
      wrapper.find('[test-id="cancel-btn"]').at(0).simulate("click");
    });
    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(Table).prop("dataSource")[0]).toEqual({
      description: "objectId",
      key: "0",
      name: "objectId",
      type: "string",
      value: "APP",
    });

    expect(wrapper.find(Table).prop("expandedRowKeys")).toEqual([
      "0",
      "1",
      "2",
      "3",
    ]);
    const clickMetricRow = (): void => {
      act(() => {
        wrapper
          .find(Table)
          .invoke("onRow")({
            name: "metrics_filter",
            type: "object",
            key: "3",
            fields: [
              {
                name: "time_range",
                type: "object",
                key: "3-0",
                fields: [
                  {
                    name: "start_time",
                    type: "int",
                    description: "start_time",
                    key: "3-0-0",
                  },
                  {
                    name: "end_time",
                    type: "int",
                    description: "end_time",
                    key: "3-0-1",
                  },
                ],
                description: "时间范围",
              },
            ],
            description: "指标过滤",
          })
          .onClick(null);
      });
    };

    clickMetricRow();

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();

    expect(wrapper.find(Table).prop("expandedRowKeys")).toEqual([
      "0",
      "1",
      "2",
    ]);
    clickMetricRow();

    await act(async () => {
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find(Table).prop("expandedRowKeys")).toEqual([
      "0",
      "1",
      "2",
      "3",
    ]);
  });
});
