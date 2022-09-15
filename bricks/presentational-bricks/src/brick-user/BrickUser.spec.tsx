import React from "react";
import { shallow, mount } from "enzyme";
import { useUserInfoByNameOrInstanceId } from "@next-libs/hooks";
import { BrickUser } from "./BrickUser";
import { UserAdminApi_searchAllUsersInfo } from "@next-sdk/user-service-sdk";
jest.mock("@next-sdk/user-service-sdk");

const fakeUsers = [
  {
    name: "a",
    instanceId: "1",
    user_icon: "a.jpg",
  },
  {
    name: "b",
    instanceId: "2",
    user_icon: "b.jpg",
  },
];
(UserAdminApi_searchAllUsersInfo as jest.Mock).mockImplementation(
  ({ query }: { query: any }) => {
    // Fake matching.
    const list = fakeUsers
      .filter(
        (user) =>
          query.$or[0].name.$in.some((name: string) => name === user.name) ||
          query.$or[1].instanceId.$in.some(
            (instanceId: string) => instanceId === user.instanceId
          )
      )
      .map((item) => ({ ...item }));
    return list.length > 0
      ? Promise.resolve({
          list,
        })
      : Promise.reject(new Error("oops"));
  }
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
    const wrapper = mount(<BrickUser userNameOrId="c" iconUrl="" />);
    expect(wrapper.find("Avatar").first().prop("src")).toBe(undefined);

    wrapper.setProps({ userNameOrId: "a" });

    await jest.advanceTimersByTime(100);
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find("Avatar").first().prop("src")).toBe("a.jpg");

    wrapper.setProps({ iconUrl: "/path/to/ico" });
    wrapper.update();
    expect(wrapper.find("Avatar").first().prop("src")).toBe("/path/to/ico");
  });
});
