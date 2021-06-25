import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { Image } from "antd";

// Mock `window.location`
delete window.location;
window.location = {
  origin: "http://localhost",
  pathname: "/next/a",
  search: "?b",
  hash: "#c:d",
} as unknown as Location;

jest.spyOn(kit, "getHistory").mockReturnValue({
  createHref: () => "/next/a?b#c",
} as any);

describe("MarkdownDisplay", () => {
  it("should work", () => {
    const wrapper = shallow(<MarkdownDisplay value={undefined} />);
    wrapper.setProps({
      value: "#123",
    });
    expect(wrapper.find("div").html()).toEqual(
      `<div class="customMarkdown"><p>#123</p>\n</div>`
    );
  });

  const sanitizeCases = [
    "<img src=x onerror=alert(1) />",
    "<p>abc<iframe src=javascript:alert(3)>def",
    "<script>alert(1234)</script>",
  ];

  it.each(sanitizeCases)(
    "innerHtml should not to contain `alert` when given '%s'",
    (value) => {
      const wrapper = shallow(<MarkdownDisplay value={value} />);
      expect(wrapper.find("div").html()).not.toContain(`alert`);
    }
  );

  it.each<[string, string]>([
    [
      "[absolute](/absolute.html)",
      '<a href="http://localhost/absolute.html">absolute</a>',
    ],
    [
      "[relative](relative.html)",
      '<a href="http://localhost/next/relative.html">relative</a>',
    ],
    [
      "[search](?search)",
      '<a href="http://localhost/next/a?search">search</a>',
    ],
    ["[hash](#hash)", '<a href="http://localhost/next/a?b#hash">hash</a>'],
  ])("should resolve link url when given '%s'", (value, result) => {
    const wrapper = shallow(<MarkdownDisplay value={value} />);
    expect(wrapper.find("div").html()).toContain(result);
  });

  it("image should be change to antd image component", async () => {
    jest.useFakeTimers();
    const element = document.createElement("div");
    document.getElementById = jest.fn(() => element);
    const wrapper = mount(
      <MarkdownDisplay value="![img](http://www.baidu.com)" />
    );

    expect(wrapper.html().indexOf("img") >= 0).toBeTruthy();
    act(() => {
      jest.runAllTimers();
    });
    expect(element.innerHTML.indexOf("ant-image") >= 0).toBeTruthy();
    jest.useRealTimers();
  });
});
