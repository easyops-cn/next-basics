import React from "react";
import { shallow } from "enzyme";
import { LogoBar } from "./LogoBar";
import { ReactComponent as Logo } from "../../images/logo-3.1.svg";
import { getRuntime } from "@next-core/brick-kit";

jest.mock("@next-core/brick-kit");
const brandFn = jest.fn().mockReturnValue({});
(getRuntime as jest.Mock).mockReturnValue({
  getBrandSettings: brandFn,
});

describe("LogoBar", () => {
  it("should work", () => {
    const wrapper = shallow(<LogoBar />);
    expect(wrapper.find(Logo).length).toBe(1);
    brandFn.mockReturnValue({ menu_bar_logo_url: "/a/b/c" });
    wrapper.setProps({});
    expect(wrapper.find(Logo).length).toBe(0);
    expect(wrapper.find("img").length).toBe(1);
  });
});
