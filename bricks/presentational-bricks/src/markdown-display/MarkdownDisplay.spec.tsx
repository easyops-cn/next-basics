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
      `<div class="customMarkdown hideImgPreviewMask"><p>#123</p>\n</div>`
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
        value="![img](http://www.baidu.com/a.jpg '=200x200')"
      />
    );

    expect(wrapper1.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p><img height=\\"200\\" width=\\"200\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper2 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg '=400×')"
      />
    );

    expect(wrapper2.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p><img width=\\"400\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper3 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg '=x400')"
      />
    );

    expect(wrapper3.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p><img height=\\"400\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper4 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg =200x200)"
      />
    );

    expect(wrapper4.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p>![img](<a href=\\"http://www.baidu.com/a.jpg\\">http://www.baidu.com/a.jpg</a> =200x200)</p>
      </div>"
    `);

    const wrapper5 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg 'size=big')"
      />
    );
    expect(wrapper5.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p><img height=\\"400\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper6 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg 'size=middle')"
      />
    );
    expect(wrapper6.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p><img height=\\"250\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);

    const wrapper7 = mount(
      <MarkdownDisplay
        imagePreview={false}
        value="![img](http://www.baidu.com/a.jpg 'size=small')"
      />
    );
    expect(wrapper7.html()).toMatchInlineSnapshot(`
      "<div class=\\"customMarkdown hideImgPreviewMask\\"><p><img height=\\"150\\" alt=\\"img\\" src=\\"http://www.baidu.com/a.jpg\\"></p>
      </div>"
    `);
  });

  it("should work when imagePreviewOperationInBottom is true", () => {
    const wrapper = mount(
      <MarkdownDisplay
        value="![img](http://www.baidu.com)"
        imagePreviewOperationInBottom={true}
      />
    );
    expect(wrapper.html().indexOf("img") >= 0).toBeTruthy();
  });

  it("should work when linkTarget is _blank", () => {
    const wrapper = mount(
      <MarkdownDisplay value="http://www.baidu.com" linkTarget={"_blank"} />
    );
    expect(wrapper.html().indexOf('target="_blank"') >= 0).toBeTruthy();
  });
});
