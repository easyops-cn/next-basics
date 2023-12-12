import React from "react";
import { shallow, mount } from "enzyme";
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
  it("should work when isNext", () => {
    const wrapper = shallow(
      <SiteMap
        {...props}
        isNext
        urlTemplates={{
          modelUrlTemplate:
            "next-cmdb-instance-management/next/#{objectId}/list",
          groupUrlTemplate:
            "next-cmdb-instance-management/brick-group/#{category}",
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
