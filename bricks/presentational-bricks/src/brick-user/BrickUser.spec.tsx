import React from "react";
import { shallow, mount } from "enzyme";
import { useUserInfoByNameOrInstanceId } from "@next-libs/hooks";
import { BrickUser } from "./BrickUser";

jest.mock("@next-libs/hooks");

(useUserInfoByNameOrInstanceId as jest.Mock).mockImplementation(
  (name: string) =>
    name === "irelia" ? { name: "irelia", user_icon: "/irelia.ico" } : null
);

describe("BrickUser", () => {
  it("should work", () => {
    const wrapper = shallow(<BrickUser userNameOrId="irelia" />);
    expect(wrapper.find("Avatar")).toBeTruthy();
  });

  it("should work, hideAvatar", () => {
    const wrapper = shallow(
      <BrickUser userNameOrId="irelia" iconUrl="assets/icon.png" hideAvatar />
    );
    expect(wrapper.find("Avatar").length).toBe(0);
  });

  it("should work, hideUsername", () => {
    const wrapper = shallow(
      <BrickUser userNameOrId="hello, irelia" hideUsername />
    );
    expect(wrapper.find("span.username").length).toBe(0);
  });

  it("useEffect should work", async () => {
    const wrapper = mount(<BrickUser userNameOrId="akali" iconUrl="" />);
    expect(wrapper.find("Avatar").first().prop("src")).toBe(undefined);

    wrapper.setProps({ userNameOrId: "irelia" });
    wrapper.update();
    expect(wrapper.find("Avatar").first().prop("src")).toBe("/irelia.ico");

    wrapper.setProps({ iconUrl: "/path/to/ico" });
    wrapper.update();
    expect(wrapper.find("Avatar").first().prop("src")).toBe("/path/to/ico");
  });
});
