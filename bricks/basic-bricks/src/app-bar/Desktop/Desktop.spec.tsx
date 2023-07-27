import React from "react";
import { shallow } from "enzyme";
import { Desktop } from "./Desktop";
import { DesktopData } from "@next-core/brick-types";
jest.mock("../LaunchpadService");
describe("Desktop", () => {
  it("should work", () => {
    const desktopData: DesktopData = {
      items: [
        {
          type: "app",
          id: "hello",
          app: {
            id: "hello",
            name: "world",
          },
        },
        {
          type: "app",
          id: "nihap",
          app: {
            id: "nihap",
            name: "shijie",
          },
        },
      ],
    } as any;
    const wrapper = shallow(
      <Desktop
        desktop={desktopData}
        desktopCount={2}
        arrowWidthPercent={9}
        activeIndex={1}
      />
    );
    expect(wrapper.find("DesktopCell").at(0).props()).toMatchObject({
      item: {
        type: "app",
        id: "hello",
        app: {
          id: "hello",
          name: "world",
        },
      },
      active: false,
    });
    expect(wrapper.find("DesktopCell").at(1).props()).toMatchObject({
      item: {
        type: "app",
        id: "nihap",
        app: {
          id: "nihap",
          name: "shijie",
        },
      },
      active: true,
    });
  });
});
