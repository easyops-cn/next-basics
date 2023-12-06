import React from "react";
import { shallow } from "enzyme";
import { SiteMap } from "./SiteMap";
import { getRuntime } from "@next-core/brick-kit";

jest.mock("@next-core/brick-kit");

const mockGetRuntime = getRuntime as jest.Mock;
mockGetRuntime.mockReturnValue({
  getFeatureFlags: () => {
    return {
      "dongyin-flow": true,
    };
  },
});

const props = {
  modelMap: [
    {
      objectId: "APP",
      name: "app",
      category: "A",
    },
    {
      objectId: "HOST",
      name: "host",
      category: "B",
    },
  ],
};
describe("SiteMap", () => {
  it("should work", () => {
    const wrapper = shallow(<SiteMap {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
