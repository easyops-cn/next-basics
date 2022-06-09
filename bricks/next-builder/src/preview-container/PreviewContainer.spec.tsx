import React from "react";
import { shallow } from "enzyme";
import { PreviewContainer } from "./PreviewContainer";
import { useBuilderDataManager } from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper");
(useBuilderDataManager as jest.Mock).mockReturnValue(() => jest.fn());

describe("PreviewContainer", () => {
  it("should work", () => {
    const wrapper = shallow(
      <PreviewContainer previewUrl="http://localhost/test.html" />
    );
    expect(wrapper).toBeTruthy();
  });
});
