import React from "react";
import { shallow, mount } from "enzyme";
import { Input } from "antd";
import { GeneralTextArea } from "./GeneralTextArea";

describe("GeneralTextArea", () => {
  it("should work", async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = mount(
      <GeneralTextArea
        onChange={handleChange}
        onHandleBlur={handleBlur}
        onHandleBlurV2={handleBlur}
      />
    );
    wrapper
      .find(Input.TextArea)
      .simulate("change", { target: { value: "hello, text area" } });
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith("hello, text area");

    wrapper.find(Input.TextArea).invoke("onBlur")({
      target: { value: "hello, text area" },
    });

    expect(handleBlur).toBeCalledWith("hello, text area");
  });

  it("should update value", () => {
    const wrapper = mount(<GeneralTextArea value="good" />);
    expect(wrapper.find(Input.TextArea).prop("value")).toBe("good");

    wrapper.setProps({
      value: "better",
    });
    wrapper.update();
    expect(wrapper.find(Input.TextArea).prop("value")).toBe("better");
  });
});
