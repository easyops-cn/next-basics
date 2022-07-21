import React from "react";
import { mount } from "enzyme";
import { PageError } from "./PageError";
import { BrickIllustration } from "../../../presentational-bricks/src/brick-illustration/BrickIllustration";
import { useFeatureFlags } from "@next-core/brick-kit";
jest.mock("@next-core/brick-kit");

(useFeatureFlags as jest.Mock).mockReturnValue([false]);

describe("PageError", () => {
  it("should show image", () => {
    const wrapper = mount(<PageError error="oops"></PageError>);
    wrapper.setProps({ code: "444" });
    expect(wrapper.find(BrickIllustration).exists()).toBe(false);
    wrapper.setProps({ code: "403" });
    expect(wrapper.find(BrickIllustration).exists()).toBe(true);
  });
});
