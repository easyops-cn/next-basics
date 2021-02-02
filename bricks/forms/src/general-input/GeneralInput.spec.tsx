import React from "react";
import i18next from "i18next";
import { K } from "../i18n/constants";
import { mount } from "enzyme";
import { Input, message } from "antd";
import { Clipboard } from "@next-libs/clipboard";
import { GeneralInput } from "./GeneralInput";

const spyOnMessageSuccess = jest.spyOn(message, "success");

describe("GeneralInput", () => {
  it("should work", async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = mount(
      <GeneralInput
        name="username"
        type="text"
        label="hello"
        placeholder="who"
        value="world"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
    wrapper.find(Input).invoke("onChange")({
      target: {
        value: "good",
      },
    } as any);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith("good");

    wrapper.find(Input).invoke("onBlur")({
      target: {
        value: "good",
      },
    });
    expect(handleBlur).toBeCalledWith("good");
  });

  it("should update value", () => {
    const wrapper = mount(<GeneralInput value="good" />);
    expect(wrapper.find(Input).prop("value")).toBe("good");

    wrapper.setProps({
      value: "better",
    });
    wrapper.update();
    expect(wrapper.find(Input).prop("value")).toBe("better");
  });

  it("should work when copyButton is true", () => {
    const value = "value";
    const wrapper = mount(<GeneralInput value={value} copyButton />);

    const clipboard = wrapper.find(Clipboard);
    expect(clipboard).toHaveLength(1);

    clipboard.invoke("onCopy")(value, true);
    expect(spyOnMessageSuccess).toBeCalledWith(i18next.t(K.COPY_SUCCESS));
  });
});
