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

  it("image could be set size", async () => {
    jest.useFakeTimers();
    const element = document.createElement("div");
    document.getElementById = jest.fn(() => element);
    const wrapper1 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg&style=200x200)"
      />
    );

    expect(wrapper1.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown\\"><p><img height=\\"200\\" width=\\"200\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper2 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg&style=400×)"
      />
    );

    expect(wrapper2.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown\\"><p><img height=\\"\\" width=\\"400\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper3 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg&style=x400)"
      />
    );

    expect(wrapper3.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown\\"><p><img height=\\"400\\" width=\\"\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper4 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpgstyle=x400)"
      />
    );

    expect(wrapper4.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown\\"><p><img height=\\"\\" width=\\"\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpgstyle=x400\\"></p>
      </div>"
    `);
  });
});
