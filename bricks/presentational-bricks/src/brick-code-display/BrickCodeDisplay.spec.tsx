import React from "react";
import { shallow } from "enzyme";
import { BrickCodeDisplay } from "./BrickCodeDisplay";

describe("BrickCodeDisplay", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickCodeDisplay
        language="javascript"
        showLineNumber={true}
        value="const a = 1;"
      />
    );
    expect(wrapper.find(".line-numbers").length).toBe(1);

    wrapper.setProps({
      language: "css",
      showLineNumber: false,
      value: ".a{color:#fff}"
    });
    wrapper.update();
    expect(wrapper.find(".line-numbers").length).toBe(0);
  });
});
