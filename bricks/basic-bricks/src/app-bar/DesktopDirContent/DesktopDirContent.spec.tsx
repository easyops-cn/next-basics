import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { DesktopDirContent } from "./DesktopDirContent";
import { NormalizedDesktopDir } from "../interfaces";
import * as desktopDirContext from "../DesktopDirContext";
import * as launchpadSettingsContext from "../LaunchpadSettingsContext";

const spyOnHistoryPush = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  push: spyOnHistoryPush,
} as any);

const spyOnSetDesktopDir = jest.fn();
jest.spyOn(desktopDirContext, "useDesktopDirContext").mockReturnValue({
  setDesktopDir: spyOnSetDesktopDir,
});
jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      isFavorite: () => true,
    },
  };
});
jest
  .spyOn(launchpadSettingsContext, "useLaunchpadSettingsContext")
  .mockReturnValue({
    columns: 2,
    rows: 2,
  });
// jest.mock("../LaunchpadService");
describe("Shallow DesktopDirContent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    const dir: NormalizedDesktopDir = {
      name: "hello",
      items: [
        {
          type: "app",
          id: "hello",
          app: {
            id: "hello",
            name: "world",
          } as any,
        },
      ],
    };
    const wrapper = shallow(
      <DesktopDirContent
        dir={dir}
        coordinates={{ x: 1, y: 2 }}
        arrowWidthPercent={9}
        activeIndex={-1}
      />
    );
    expect(wrapper.find("DesktopCell").length).toBe(1);

    const stopPropagation = jest.fn();
    wrapper.find(".dirContainer").invoke("onClick")({
      stopPropagation,
    } as any);
    expect(stopPropagation).toBeCalled();
    expect(spyOnSetDesktopDir).toBeCalledWith(undefined);
  });
});

describe("Mount DesktopDirContent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    dir: {
      name: "hello",
      items: [
        {
          type: "app",
          id: "a",
          app: {
            id: "a",
            name: "A",
          },
        },
        {
          type: "app",
          id: "b",
          app: {
            id: "b",
            name: "B",
          },
        },
        {
          type: "custom",
          id: "c",
          name: "C",
          url: "/c",
        },
      ],
    },
    coordinates: { x: 1, y: 2 },
    arrowWidthPercent: 9,
  } as any;

  it.each<[number, string, number]>([
    [-1, "ArrowRight", 0],
    [-1, "ArrowDown", 0],
    [-1, "ArrowLeft", 2],
    [-1, "ArrowUp", 2],
    [0, "a", 0],
    [1, "ArrowRight", 2],
    [1, "ArrowDown", 1],
    [1, "ArrowLeft", 0],
    [1, "ArrowUp", 1],
  ])(
    "when active index is %d and press %s, new active should be %d",
    (activeIndex, key, index) => {
      const wrapper = mount(
        <DesktopDirContent {...props} activeIndex={activeIndex} />
      );
      act(() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key,
          })
        );
      });
      wrapper.update();
      expect(wrapper.find("DesktopCell").at(index).prop("active")).toBe(true);
    }
  );

  // Todo(steve): isolated document event listeners.
  /* it("should handle Enter keydown", () => {
    mount(
      <DesktopDirContent
        {...props}
        activeIndex={-1}
      />
    );
    document.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Enter"
    }));
    expect(spyOnHistoryPush).not.toBeCalled();
  }); */

  it("should handle Escape keydown", () => {
    mount(<DesktopDirContent {...props} activeIndex={-1} />);
    const escapeKeyDown = new KeyboardEvent("keydown", {
      key: "Escape",
    });
    const stopPropagation = jest.spyOn(escapeKeyDown, "stopPropagation");
    const preventDefault = jest.spyOn(escapeKeyDown, "preventDefault");
    document.dispatchEvent(escapeKeyDown);
    expect(stopPropagation).toBeCalled();
    expect(preventDefault).toBeCalled();
    expect(spyOnSetDesktopDir).toBeCalledWith(undefined);
  });
});
