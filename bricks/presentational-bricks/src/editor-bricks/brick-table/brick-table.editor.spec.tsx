import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickTableEditor } from "./brick-table.editor";

describe("BrickTableEditor", () => {
  it("should work with empty propety", () => {
    jest.spyOn(helper, "useBuilderNode").mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-table",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <BrickTableEditor nodeUid={1} brick="brick-table" />
    );
    expect(wrapper.find(".row").length).toBe(3);
    expect(wrapper.find(".row").at(0).find(".cell").length).toBe(3);
  });
  it("should render table with specified properties", () => {
    jest.spyOn(helper, "useBuilderNode").mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-table",
      alias: "my-brick",
      $$parsedProperties: {
        columns: [
          {
            dataIndex: "name",
            key: "name",
            title: "名称",
          },
          {
            dataIndex: "hobby",
            key: "hobby",
            headerBrick: {
              brick: "span",
              properties: {
                textContent: "爱好",
              },
            },
          },
        ],
        configProps: {
          rowSelection: true,
        },
      },
    });

    const wrapper = shallow(
      <BrickTableEditor nodeUid={1} brick="brick-table" />
    );

    expect(wrapper.find(".checkbox").length).toEqual(3);
    expect(wrapper.find(".head .cell").at(0).text()).toEqual("名称");
  });
});
