import React from "react";
import { mount } from "enzyme";
import { Upload, Modal } from "antd";
import { http } from "@next-core/brick-http";
import * as brickKit from "@next-core/brick-kit";
import { AvatarUpload } from "./AvatarUpload";

jest.mock("react-avatar-editor", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require("react");
  function MockAvatarEditor(): React.ReactElement {
    const divRef = React.useRef();
    React.useImperativeHandle(divRef, () => divRef.current);
    return <div ref={divRef}></div>;
  }
  return React.forwardRef(MockAvatarEditor);
});

jest.mock("@next-core/brick-http");

const mockHttp = jest.spyOn(http, "put").mockImplementation(() => void 0);
const mockUploadSuccess = jest.fn();
const props = {
  size: 150,
  uploadSuccess: mockUploadSuccess,
} as any;

describe("AvatarUpload", () => {
  it("should work", () => {
    jest.spyOn(brickKit, "getAuth").mockReturnValueOnce({ csrfToken: "abcde" });
    const wrapper = mount(<AvatarUpload {...props} />);

    expect(wrapper.find(Upload).prop("headers")).toEqual({
      "X-CSRF-Token": "abcde",
    });

    // wrapper.find("Button").simulate("click")
    wrapper.find(Upload).invoke("beforeUpload")(
      {
        uid: "123",
        size: 1024 * 1024 * 1024,
      } as any,
      []
    );
  });

  it("should work", async () => {
    // mockCanvas(global)
    const wrapper = mount(<AvatarUpload {...props} imgSrc="mock" />);
    // wrapper.find("Button").simulate("click")
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    wrapper.find(Upload).invoke("beforeUpload")(file as any, []);
    await (global as any).flushPromises();
    expect(wrapper.find(Modal).prop("visible")).toBe(true);
    wrapper.find(Modal).invoke("onOk")({} as any);

    // Todo(momo): make assertions.
    // expect(mockHttp).toHaveBeenCalled();
  });
});
