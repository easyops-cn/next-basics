import React from "react";
import { shallow } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { SidebarMenu } from "@next-core/brick-types";
import { AppMenu } from "./AppMenu";

jest.spyOn(kit, "useCurrentApp").mockReturnValue({
  id: "hello",
} as any);

jest.spyOn(kit, "useLocation").mockReturnValue({
  pathname: "/hello",
} as any);

describe("AppMenu", () => {
  const menu: SidebarMenu = {
    title: "Great",
    menuItems: [
      {
        text: "for-good",
        to: "/for/good",
      },
      {
        type: "default",
        text: "for-better",
        to: {
          pathname: "/for-better",
          search: "?even-more",
        },
      },
      {
        type: "group",
        title: "grouped",
        items: [
          {
            text: "for-perfect",
            to: "/for/perfect",
            icon: {
              lib: "antd",
              type: "up",
            },
          },
        ],
      },
    ],
    showRelatedApps: true,
  };

  it("should work", () => {
    const wrapper = shallow(<AppMenu menu={{ ...menu, link: "/mock-link" }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when collapsed", () => {
    const wrapper = shallow(<AppMenu menu={menu} collapsed={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render nothing if menu is falsy", () => {
    const wrapper = shallow(<AppMenu menu={undefined} />);
    expect(wrapper.text()).toBe("");
  });
});
