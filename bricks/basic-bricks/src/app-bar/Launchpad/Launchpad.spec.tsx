import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import { getRuntime } from "@next-core/brick-kit";
import { MicroApp, DesktopData } from "@next-core/brick-types";
import { Launchpad } from "./Launchpad";
import { SearchBar } from "../SearchBar/SearchBar";
import { DesktopSlider } from "../DesktopSlider/DesktopSlider";

jest.mock("@next-core/brick-kit");
jest.mock("../SearchBar/SearchBar");
jest.mock("../DesktopSlider/DesktopSlider");
jest.mock("../FavoriteDesktopCell/FavoriteDesktopCell");
jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      fetchFavoriteList: (): any[] => [],
      getAllVisitors: (): any[] => [],
      setMaxVisitorLength: jest.fn(),
    },
  };
});

jest.mock("@next-libs/basic-components", () => {
  return {
    Link: function Link() {
      return <div>Link</div>;
    },
  };
});

const spyOnReloadMicroApps = jest.fn();

(getRuntime as jest.Mock).mockReturnValue({
  reloadMicroApps: spyOnReloadMicroApps,
  getMicroApps: (): MicroApp[] => [
    {
      id: "a",
      name: "a",
      homepage: "/a",
      icons: {
        large: "a.svg",
      },
    },
    {
      id: "b",
      name: "b",
      homepage: "/b",
      installStatus: "running",
      icons: {
        large: "https://icon.png",
      },
    },
    {
      id: "c",
      name: "c",
      homepage: "/c",
      installStatus: "running",
    },
    {
      id: "d",
      name: "d",
      homepage: "/d",
      status: "developing",
    },
  ],
  getDesktops: (): DesktopData[] => [
    {
      items: [],
    },
  ],
  getLaunchpadSettings: () => ({
    columns: 5,
    rows: 4,
  }),
});

describe("Launchpad", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle close", () => {
    const handleWillClose = jest.fn();
    const wrapper = shallow(<Launchpad onWillClose={handleWillClose} />);
    wrapper.find(".launchpad").simulate("click");
    expect(handleWillClose).toBeCalled();
  });

  it("should handle search", () => {
    const wrapper = shallow(<Launchpad />);
    wrapper.find(SearchBar).invoke("onChange")("hello");
    expect(wrapper.find(DesktopSlider).prop("q")).toBe("hello");
  });

  it("should handle Escape keydown", () => {
    const handleWillClose = jest.fn();
    mount(<Launchpad onWillClose={handleWillClose} />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "a",
      })
    );
    expect(handleWillClose).not.toBeCalled();
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
      })
    );
    expect(handleWillClose).toBeCalled();
  });

  it("test pollingRunningAppStatus", async () => {
    const wrapper = mount(<Launchpad />);
    expect(spyOnReloadMicroApps).toBeCalled();
    await (global as any).flushPromises();
    wrapper.update();
    jest.advanceTimersByTime(1000);
    expect(spyOnReloadMicroApps).toBeCalled();
    wrapper.unmount();
  });
});
