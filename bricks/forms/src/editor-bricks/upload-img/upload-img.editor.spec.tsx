import React from "react";
import { shallow } from "enzyme";
import { PictureOutlined } from "@ant-design/icons";
import * as helper from "@next-core/editor-bricks-helper";
import { UploadImgEditor } from "./upload-img.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("UploadImgEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "upload-img",
      alias: "my-brick",
      $$parsedProperties: {
        label: "上传图片",
      },
    });
    const wrapper = shallow(<UploadImgEditor nodeUid={1} />);
    expect(wrapper.find(".formLabel").text()).toBe("上传图片");
    expect(wrapper.find(PictureOutlined).length).toEqual(1);
  });
});
