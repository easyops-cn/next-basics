import React from "react";
import { shallow } from "enzyme";
import { BrickError } from "./BrickError";

describe("BrickError", () => {
  it("should work for brick", () => {
    const wrapper = shallow(
      <BrickError
        errorType="ResolveRequestError"
        errorMessage="Invalid parameters"
        brickName="my-chart"
      />
    );
    expect(wrapper.find("p").at(0).text()).toBe("BRICK_ERROR");
    expect(wrapper.find("p").at(1).text()).toBe(
      "<my-chart> ResolveRequestError: Invalid parameters"
    );
  });

  it("should work for legacy template", () => {
    const wrapper = shallow(
      <BrickError
        errorType="ResolveRequestError"
        errorMessage="Invalid parameters"
        brickName="my-chart"
        isLegacyTemplate
      />
    );
    expect(wrapper.find("p").at(0).text()).toBe("LEGACY_TEMPLATE_ERROR");
    expect(wrapper.find("p").at(1).text()).toBe(
      "<my-chart> ResolveRequestError: Invalid parameters"
    );
  });
});
