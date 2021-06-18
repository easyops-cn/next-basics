import React from "react";
import { shallow, mount } from "enzyme";
import { Radio } from "antd";
import { getRuntime, i18nText } from "@next-core/brick-kit";
import { BrickBook } from "./BrickBook";
import { BrickDemo } from "../BrickDemo/BrickDemo";

jest.mock("@next-core/brick-kit");
jest.mock("../BrickDemo/BrickDemo");
jest.mock("../../stories/chapters/atom-bricks");
jest.mock("../../stories/chapters/business-bricks");
jest.mock("@next-libs/basic-components", () => ({
  Link: jest.fn(() => {
    return "<a></a>";
  }),
}));

const applyPageTitle = jest.fn();
(getRuntime as jest.Mock).mockReturnValue({
  applyPageTitle,
});

(i18nText as jest.MockedFunction<typeof i18nText>).mockImplementation(
  (data) => data?.zh
);

describe("BrickBook", () => {
  afterEach(() => {
    jest.clearAllMocks();
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

  it("should work when render as default language", async () => {
    mount(
      <BrickBook stories={[]} storyId="fake-story-of-slots" storyType="brick" />
    );
    expect(applyPageTitle).toBeCalledWith("Fake Story of Slots Zh");
  });

  it("should render nothing if story not found", () => {
    const wrapper = shallow(
      <BrickBook stories={[]} storyId="not-existed-story" storyType="brick" />
    );
    expect(wrapper.html()).toBe(null);
  });
});
