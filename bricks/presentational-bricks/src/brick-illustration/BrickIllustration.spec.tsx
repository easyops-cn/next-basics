import React from "react";
import { shallow } from "enzyme";
import { BrickIllustration } from "./BrickIllustration";
import { Link } from "@next-libs/basic-components";

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
});
