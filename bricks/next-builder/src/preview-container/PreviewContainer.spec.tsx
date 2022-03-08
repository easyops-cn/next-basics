import React from "react";
import { shallow } from "enzyme";
import { PreviewContainer } from "./PreviewContainer";

describe("PreviewContainer", () => {
  it("should work", () => {
    const wrapper = shallow(
      <PreviewContainer previewUrl="http://localhost/test.html" />
    );
    expect(wrapper).toBeTruthy();
  });
});
