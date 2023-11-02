import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrickUserGroup } from "./BrickUserGroup";
import { UserAdminApi_searchAllUsersInfo } from "@next-sdk/user-service-sdk";
import { shallow, mount } from "enzyme";

jest.mock("@next-sdk/user-service-sdk");

const fakeUsers = [
  {
    name: "a",
    instanceId: "1",
    "#showKey": ["a", "showA"],
  },
  {
    name: "b",
    instanceId: "2",
    "#showKey": ["b", "showB"],
  },
];

(UserAdminApi_searchAllUsersInfo as jest.Mock).mockResolvedValue({
  list: fakeUsers,
});

describe("BrickUserGroup", () => {
  it("should work", async () => {
    render(<BrickUserGroup userNameOrIds={[]} />);
    expect(UserAdminApi_searchAllUsersInfo).not.toBeCalled();
  });
  it("should render userNameOrIds", async () => {
    render(<BrickUserGroup userNameOrIds={["a", "b"]} />);
    await jest.advanceTimersByTime(100);
    await (global as any).flushPromises();
    expect(screen.getByText("a")).toBeTruthy();
  });

  it("should render showKey", async () => {
    const wrapper = mount(
      <BrickUserGroup userNameOrIds={["a", "b"]} displayShowKey />
    );
    await jest.advanceTimersByTime(100);
    await (global as any).flushPromises();
    wrapper.update();
    expect(wrapper.find("Tooltip").get(0).props["title"]).toBe("a(showA)");
  });
});
