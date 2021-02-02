import React from "react";
import { shallow, mount } from "enzyme";
import { Input } from "antd";
import * as kit from "@next-core/brick-kit";
import {
  MarkdownEditor,
  MarkdownEditorItem,
  MarkdownEditorItemWrapper,
} from "./MarkdownEditor";
import { ObjectStoreApi } from "@sdk/object-store-sdk";
import { act } from "react-dom/test-utils";

jest.mock("@sdk/object-store-sdk");
jest.spyOn(ObjectStoreApi, "putObject").mockResolvedValue({
  objectName: "image.png",
});

// Mock `window.location`
delete window.location;
window.location = ({
  origin: "http://localhost",
  pathname: "/next/a",
  search: "?b",
  hash: "#c",
} as unknown) as Location;

jest.spyOn(kit, "getHistory").mockReturnValue({
  createHref: () => "/next/a?b#c",
} as any);

describe("MarkdownEditor", () => {
  it("should work", () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <MarkdownEditor value="### 123" onChange={handleChange} />
    );

    wrapper.find(MarkdownEditorItemWrapper).invoke("onChange")("### test");
    expect(handleChange).toBeCalledWith("### test");

    expect(wrapper).toMatchSnapshot();
  });
  it("test onChange", () => {
    const callback = jest.fn();
    const wrapper = shallow(<MarkdownEditorItem onChange={callback} />);
    wrapper.find(Input.TextArea).invoke("onChange")({
      target: {
        value: "<a>123</a>",
      },
    } as any);
    expect(callback).toHaveBeenCalled();
    expect(wrapper.find(Input.TextArea).prop("value")).toBe("<a>123</a>");
  });

  it("should update value", () => {
    const callback = jest.fn();
    const wrapper = mount(<MarkdownEditor onChange={callback} value="123" />);
    expect(wrapper.find(Input.TextArea).prop("value")).toBe("123");
    wrapper.setProps({
      value: "new value",
    });
    wrapper.update();
    expect(wrapper.find(Input.TextArea).prop("value")).toBe("new value");
  });

  it("should upload image", async () => {
    const handleChange = jest.fn();
    const handleUploadImage = jest.fn();
    const wrapper = mount(
      <MarkdownEditorItemWrapper
        onChange={handleChange}
        value="123"
        supportUploadImg={true}
        bucketName="testBucket"
        onUploadImage={handleUploadImage}
      />
    );
    await act(async () => {
      wrapper.find(Input.TextArea).invoke("onPaste")({
        clipboardData: {
          items: [
            {
              getAsFile: jest.fn(
                () => new File([], "image.png", { type: "image/png" })
              ),
            },
          ],
          getData: jest.fn(() => "image.png"),
        },
        target: {
          selectionStart: 2,
          selectionEnd: 2,
        },
      });
    });
    expect(handleUploadImage).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith("12{{ image.png }}3");
    expect(handleChange).toHaveBeenCalledWith(
      "12![image.png](/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/testBucket/object/image.png)3"
    );
  });

  const cases = [
    "<img src=x onerror=alert(1) />",
    "<p>abc<iframe src=javascript:alert(3)>def",
    "<script>alert(1234)</script>",
  ];

  it.each(cases)(
    "innerHtml should not to contain `alert` when enter (%s)",
    (value) => {
      const wrapper = shallow(<MarkdownEditorItem />);
      wrapper.find(Input.TextArea).simulate("change", {
        target: {
          value,
        },
      });
      expect(wrapper.find(".markdownPreviewContainer").html()).not.toContain(
        `alert`
      );
    }
  );
});
