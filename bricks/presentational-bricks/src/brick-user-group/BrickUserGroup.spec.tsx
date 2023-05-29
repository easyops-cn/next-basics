import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrickUserGroup } from "./BrickUserGroup";
import { UserAdminApi_searchAllUsersInfo } from "@next-sdk/user-service-sdk";
import { getAvatar } from "@next-libs/hooks";
import { shallow, mount } from "enzyme";
import { act } from "react-test-renderer";

jest.mock("@next-sdk/user-service-sdk");
jest.mock("@next-libs/hooks");

(getAvatar as jest.Mock).mockImplementation((user: any) => (
  <span data-testid={user.name}>{user.name}</span>
));

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
    await act(async () => {
      await (global as any).flushPromises();
    });
    expect(screen.getByText("a")).toBeTruthy();
    expect(screen.getByText("b")).toBeTruthy();
  });

  it("should render showKey", async () => {
    const wrapper = mount(
      <BrickUserGroup userNameOrIds={["a", "b"]} displayShowKey />
    );
    await act(async () => {
      await jest.advanceTimersByTime(100);
      await (global as any).flushPromises();
    });
    wrapper.update();
    expect(wrapper.find("Tooltip").get(0).props["title"]).toBe("a(showA)");
  });
});
