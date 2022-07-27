import React from "react";
import { shallow } from "enzyme";
import { BrickIllustration } from "./BrickIllustration";
import { Link } from "@next-libs/basic-components";
import {
  useFeatureFlags,
  getRuntime,
  useCurrentApp,
} from "@next-core/brick-kit";
jest.mock("@next-core/brick-kit");

(useFeatureFlags as jest.Mock).mockReturnValue([false]);

(useCurrentApp as jest.Mock).mockReturnValue({ id: "events" });

(getRuntime as jest.Mock).mockReturnValue({
  getMiscSettings: jest.fn().mockReturnValue({
    supportedNewIllustrationApps: [],
  }),
});

describe("BrickIllustration", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickIllustration
        mode={"feedback"}
        category={"default"}
        name={"no-content"}
        header={{ title: "Header", description: "desc.." }}
        footer={{ label: "word", url: "example.com", text: "hello" }}
      />
    );

    expect(wrapper.find("img").prop("src")).toContain(
      "assets/illustrations/default/no-content"
    );
    expect(wrapper.find(".title").at(0).text()).toBe("Header");
    expect(wrapper.find(".description").at(0).text()).toBe("desc..");
    expect(wrapper.find(".text").at(0).text()).toBe("hello");
    expect(wrapper.find(Link).prop("to")).toBe("example.com");
    expect(wrapper.find(Link).at(0).contains("word")).toBe(true);
  });

  it("Do not show header and footer", () => {
    const wrapper = shallow(
      <BrickIllustration
        mode={"feedback"}
        category={"default"}
        name={"no-content"}
      />
    );

    expect(wrapper.find(".header").exists()).toBe(false);
    expect(wrapper.find(".footer").exists()).toBe(false);
  });

  it("should work with featureFlags is true and contain events app ", () => {
    (useFeatureFlags as jest.Mock).mockReturnValue([true]);
    (getRuntime as jest.Mock).mockReturnValue({
      getMiscSettings: jest.fn().mockReturnValue({
        supportedNewIllustrationApps: ["events"],
      }),
    });
    const wrapper = shallow(
      <BrickIllustration
        mode={"feedback"}
        category={"default"}
        name={"no-content"}
        useNewIllustration={true}
      />
    );

    expect(wrapper.children().find("img").prop("src")).toContain(
      "assets/illustrations/easyops2/no-content"
    );
  });
});
