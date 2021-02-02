import React from "react";
import { act } from "react-dom/test-utils";

import { shallow, mount } from "enzyme";
import { BrickUser } from "./BrickUser";
import { getRuntime } from "@next-core/brick-kit";

jest.mock("@next-core/brick-kit");
const mockGetRuntime = getRuntime as jest.Mock;
const map = new Map([["irelia", { name: "irelia", user_icon: "/irelia.ico" }]]);
mockGetRuntime.mockReturnValue({
  getAllUserMapAsync: jest.fn().mockResolvedValue(map)
});

describe("BrickUser", () => {
  it("should work", () => {
    const wrapper = shallow(<BrickUser userNameOrId="irelia" />);
    expect(wrapper.find("Avatar")).toBeTruthy();
  });

  it("should work, hideAvatar", () => {
    const wrapper = shallow(
      <BrickUser
        userNameOrId="irelia"
        iconUrl="assets/icon.png"
        hideAvatar={true}
      />
    );
    expect(wrapper.find("Avatar").length).toBe(0);
  });

  it("should work, hideUsername", () => {
    const wrapper = shallow(
      <BrickUser userNameOrId="hello, irelia" hideUsername={true} />
    );
    expect(wrapper.find("span.username").length).toBe(0);
  });

  it("useEffect should work", async () => {
    const wrapper = mount(<BrickUser userNameOrId="akali" iconUrl="" />);
    await act(async () => {
      wrapper.setProps({ userNameOrId: "irelia" });
    });
    // force re-render
    wrapper.setProps({});
    expect(
      wrapper
        .find("Avatar")
        .first()
        .prop("src")
    ).toBe("/irelia.ico");

    await act(async () => {
      wrapper.setProps({ iconUrl: "/path/to/ico" });
    });
    wrapper.setProps({});
    expect(
      wrapper
        .find("Avatar")
        .first()
        .prop("src")
    ).toBe("/path/to/ico");
  });
});
