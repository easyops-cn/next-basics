import React from "react";
import { shallow } from "enzyme";
import { LaunchpadPortal } from "./LaunchpadPortal";
import { LaunchpadWrapper } from "../LaunchpadWrapper/LaunchpadWrapper";

jest.mock("../LaunchpadService");
describe("LaunchpadPortal", () => {
  it("should work", () => {
    const wrapper = shallow(<LaunchpadPortal visible={true} />);
    expect(wrapper).toMatchInlineSnapshot(`
            <Portal
              containerInfo={<div />}
            >
              <LaunchpadWrapper />
            </Portal>
        `);
  });

  it("should trigger onWillClose", () => {
    const handleWillClose = jest.fn();
    const wrapper = shallow(
      <LaunchpadPortal visible={true} onWillClose={handleWillClose} />
    );
    wrapper.find(LaunchpadWrapper).invoke("onWillClose")();
    expect(handleWillClose).toBeCalled();
  });

  it("should trigger nClose", () => {
    const handleClose = jest.fn();
    const wrapper = shallow(
      <LaunchpadPortal visible={true} onClose={handleClose} />
    );
    wrapper.find(LaunchpadWrapper).invoke("onClose")();
    expect(handleClose).toBeCalled();
  });

  it("should render null if visible is false", () => {
    const wrapper = shallow(<LaunchpadPortal visible={false} />);
    expect(wrapper.html()).toBe(null);
  });
});
