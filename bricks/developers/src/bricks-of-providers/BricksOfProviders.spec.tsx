import React from "react";
import { shallow, mount } from "enzyme";
import { createHistory } from "@next-core/brick-kit";
import { BricksOfProviders, ServiceData } from "./BricksOfProviders";

createHistory();

describe("BricksOfProviders", () => {
  it("should work", () => {
    const serviceData: ServiceData = {
      id: "micro-app",
      bricks: [
        "providers-of-micro-app.installed-micro-app-api-get-installed-micro-app"
      ]
    };
    const wrapper = mount(<BricksOfProviders serviceData={serviceData} />);
    expect(wrapper.find(".ant-list-item-meta-title a").text()).toBe(
      serviceData.bricks[0]
    );
    expect(wrapper.find(".ant-list-item-meta-title a").prop("href")).toBe(
      "/developers/providers/micro-app/installed-micro-app-api-get-installed-micro-app"
    );
  });

  it("should render nothing if no serviceData", () => {
    const wrapper = shallow(<BricksOfProviders serviceData={null} />);
    expect(wrapper.html()).toBe(null);
  });
});
