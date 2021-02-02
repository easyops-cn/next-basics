import React from "react";
import { shallow, mount } from "enzyme";
import i18next from "i18next";
import { getRuntime } from "@next-core/brick-kit";
import { BrickBook } from "./BrickBook";
import { BrickDemo } from "../BrickDemo/BrickDemo";
import { Radio } from "antd";

jest.mock("@next-core/brick-kit");
jest.mock("../BrickDemo/BrickDemo");
jest.mock("../../stories/chapters/atom-bricks");
jest.mock("../../stories/chapters/business-bricks");
jest.mock("@next-libs/basic-components", () => ({
  Link: jest.fn(() => {
    return "<a></a>";
  }),
}));

const spyOnSetPageTitle = jest.fn();
(getRuntime as jest.Mock).mockReturnValue({
  appBar: {
    setPageTitle: spyOnSetPageTitle,
  },
});

describe("BrickBook", () => {
  afterEach(() => {
    spyOnSetPageTitle.mockClear();
  });

  it("should work when shallow rendering", async () => {
    const wrapper = shallow(
      <BrickBook
        stories={[]}
        storyId="fake-story-of-correct"
        storyType="brick"
      />
    );
    wrapper.find(Radio.Group).invoke("onChange")({ target: { value: "json" } });
    await (global as any).flushPromises();
    expect(wrapper.find(BrickDemo).at(0).prop("mode")).toBe("json");
    expect(wrapper.find(BrickDemo).length).toBe(1);
  });

  it("should work when full dom rendering", () => {
    i18next.language = "en";
    mount(
      <BrickBook
        stories={[]}
        storyId="fake-story-of-correct"
        storyType="brick"
      />
    );
    expect(spyOnSetPageTitle).toBeCalledWith("Fake Story of Correct En");
  });

  it("should work when render as default language", async () => {
    i18next.language = null;
    mount(
      <BrickBook stories={[]} storyId="fake-story-of-slots" storyType="brick" />
    );
    expect(spyOnSetPageTitle).toBeCalledWith("Fake Story of Slots Zh");
  });

  it("should render nothing if story not found", () => {
    const wrapper = shallow(
      <BrickBook stories={[]} storyId="not-existed-story" storyType="brick" />
    );
    expect(wrapper.html()).toBe(null);
  });
});
