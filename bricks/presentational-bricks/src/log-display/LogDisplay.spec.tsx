import React from "react";
import { mount } from "enzyme";
import { LogDisplay, LogDisplayProps } from "./LogDisplay";

describe("LogDisplay", () => {
  it("should work", () => {
    const wrapper = mount<LogDisplayProps>(<LogDisplay value={"abc"} />);
    expect(wrapper.text()).toBe("abc");

    wrapper.setProps({
      loadingIcon: true,
    });

    expect(wrapper.find(".ellipsis").html()).toEqual(
      '<div class="ellipsis"><span></span><span></span><span></span><span></span></div>'
    );

    wrapper.setProps({ hasBackspace: true, value: null });
    wrapper.setProps({
      value:
        "Downloading (connecting...)Downloading (0%)           Downloading (65%)Downloading (100%)",
    });
    expect(wrapper.find(".terminal").text()).toBe("Downloading (100%)");
  });
});
