import React from "react";
import { mount } from "enzyme";
import { CSSTransition } from "react-transition-group";
import { LaunchpadWrapper } from "./LaunchpadWrapper";
import { Launchpad } from "../Launchpad/Launchpad";
import { act } from "react-dom/test-utils";

jest.mock("../Launchpad/Launchpad");

describe("LaunchpadWrapper", () => {
  it("should fade out when launchpad will close", async () => {
    const handleWillClose = jest.fn();
    const handleClose = jest.fn();
    const wrapper = mount(
      <LaunchpadWrapper onWillClose={handleWillClose} onClose={handleClose} />
    );
    act(() => {
      wrapper.find(Launchpad).invoke("onWillClose")();
    });
    wrapper.update();
    expect(wrapper.find(CSSTransition).prop("in")).toBe(false);
    expect(handleWillClose).toBeCalled();

    expect(handleClose).not.toBeCalled();
    await jest.advanceTimersByTime(wrapper
      .find(CSSTransition)
      .prop("timeout") as number);
    expect(handleClose).toBeCalled();
  });
});
