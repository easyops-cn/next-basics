import React from "react";
import { shallow } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { OtherAppMenu } from "./OtherAppMenu";

jest.mock("@next-core/brick-kit");

jest.spyOn(kit, "getRuntime").mockReturnValue({
  getMicroApps: () => [
    {
      id: "hello",
      name: "世界",
      localeName: "world",
      menuIcon: {
        lib: "antd",
        type: "desktop",
      },
    },
  ],
} as any);

describe("OtherAppMenu", () => {
  it("should work", () => {
    const app: any = {
      subPath: "/hello/${name}",
      microAppId: "hello",
    };
    const matchResult: any = {
      params: {
        name: "good",
      },
    };
    const wrapper = shallow(
      <OtherAppMenu app={app} matchResult={matchResult} collapsed={false} />
    );
    expect(wrapper.find(Link).prop("to")).toBe("/hello/good");
    expect(wrapper.find(GeneralIcon).prop("icon")).toEqual({
      lib: "antd",
      type: "desktop",
    });
    expect(wrapper.find(".menuTitleText").text()).toBe("world");
  });
});
