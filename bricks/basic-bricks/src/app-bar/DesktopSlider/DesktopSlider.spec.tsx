import React from "react";
import { shallow, mount } from "enzyme";
import { MicroApp, DesktopData } from "@next-core/brick-types";
import { DesktopSlider } from "./DesktopSlider";
import { Desktop } from "../Desktop/Desktop";
import { MyDesktop } from "../MyDesktop/MyDesktop";
import * as context from "../LaunchpadSettingsContext";
import { act } from "react-dom/test-utils";

jest.mock("../MyDesktop/MyDesktop");
jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      setMaxVisitorLength: jest.fn(),
      pushVisitor: jest.fn(),
      setAsFavorite: jest.fn(),
      isFavorite: () => false,
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
jest.spyOn(context, "useLaunchpadSettingsContext").mockReturnValue({
  columns: 2,
  rows: 2,
});

describe("Shallow FavoriteDesktopCell", () => {
  // Need the isolate modules cause `rememberedDesktopCursor`.
  let IsolatedDesktopSlider: typeof DesktopSlider;
  beforeEach(() => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      IsolatedDesktopSlider = require("./DesktopSlider").DesktopSlider;
    });
  });

  it("should work if props.desktops is undefined", async () => {
    const apps: MicroApp[] = [
      {
        id: "hello",
        name: "世界",
        localeName: "world",
        homepage: "/hello",
      },
      {
        id: "haha",
        name: "呵呵",
        localeName: "hehe",
        homepage: "/xixi",
      },
      {
        id: "oops",
        name: "糟糕",
        localeName: "oops",
        homepage: "/oops",
      },
      {
        id: "a",
        name: "a",
        localeName: "a",
        homepage: "/a",
      },
      {
        id: "b",
        name: "b",
        localeName: "b",
        homepage: "/b",
      },
    ];
    const wrapper = shallow(
      <IsolatedDesktopSlider microApps={apps} arrowWidthPercent={9} />
    );
    expect(wrapper.find(Desktop).length).toBe(2);
    expect(wrapper.find(MyDesktop)).toHaveLength(1);
    expect(wrapper.find(".desktopName").length).toBe(3);

    expect(wrapper.find(".arrowLeft").prop("className")).not.toContain(
      "available"
    );
    expect(wrapper.find(".arrowRight").prop("className")).toContain(
      "available"
    );

    // Slide to right
    const stopPropagation = jest.fn();
    act(() => {
      wrapper.find(".arrowRight").invoke("onClick")({
        stopPropagation,
      } as any);
    });
    expect(stopPropagation).toBeCalled();

    expect(wrapper.find(".arrowLeft").prop("className")).toContain("available");
    expect(wrapper.find(".arrowRight").prop("className")).toContain(
      "available"
    );
    await jest.advanceTimersByTime(400);
    act(() => {
      wrapper.find(".arrowRight").invoke("onClick")({
        stopPropagation,
      } as any);
    });

    expect(wrapper.find(".arrowRight").prop("className")).not.toContain(
      "available"
    );

    // Slide to left when sliding is locked.
    act(() => {
      wrapper.find(".arrowLeft").invoke("onClick")({
        stopPropagation,
      } as any);
    });
    expect(wrapper.find(".desktopList").prop("style")).toMatchObject({
      marginLeft: "-200%",
    });

    await jest.advanceTimersByTime(400);

    act(() => {
      wrapper.find(".arrowLeft").invoke("onClick")({
        stopPropagation,
      } as any);
    });

    await jest.advanceTimersByTime(400);
    // Slide to left when sliding is unlocked.
    act(() => {
      wrapper.find(".arrowLeft").invoke("onClick")({
        stopPropagation,
      } as any);
    });
    expect(wrapper.find(".desktopList").prop("style")).toMatchObject({
      marginLeft: "0%",
    });

    await jest.advanceTimersByTime(400);
    act(() => {
      wrapper.find(".desktopName").at(1).invoke("onClick")({
        stopPropagation,
      } as any);
    });
    expect(wrapper.find(".desktopList").prop("style")).toMatchObject({
      marginLeft: "-100%",
    });

    // Searching.
    wrapper.setProps({
      q: "heh",
    });
    expect(wrapper.find(".desktopSlider").prop("className")).toContain(
      "filtered"
    );
    const filteredApps = wrapper
      .find(".filteredList")
      .find(Desktop)
      .prop("desktop").items;
    expect(filteredApps.length).toBe(1);
    expect(filteredApps[0]).toMatchObject({
      id: "haha",
      app: {
        id: "haha",
      },
    });

    // Searching match id too.
    wrapper.setProps({
      q: "he",
    });
    expect(
      wrapper.find(".filteredList").find(Desktop).prop("desktop").items.length
    ).toBe(2);

    // Wheeling
    wrapper.find(".scrollContainer").invoke("onWheel")({
      deltaX: 0,
      deltaY: 2,
    } as any);
    wrapper.find(".scrollContainer").invoke("onWheel")({
      deltaX: 0,
      deltaY: 2,
    } as any);

    jest.advanceTimersByTime(50);
    wrapper.find(".scrollContainer").invoke("onWheel")({
      deltaX: -40,
      deltaY: 0,
    } as any);

    // Todo(steve): make assertions.
  });

  it("should render desktops", () => {
    const apps: MicroApp[] = [
      {
        id: "hello",
        name: "world",
        homepage: "/hello",
      },
      {
        id: "haha",
        name: "hehe",
        homepage: "/xixi",
      },
      {
        id: "rest",
        name: "rest",
        homepage: "/rest",
      },
    ];
    const desktops: DesktopData[] = [
      {
        name: "MyDesktop One",
        items: [
          {
            type: "app",
            id: "hello",
          },
          {
            type: "app",
            id: "not-existed",
          },
          {
            type: "dir",
            id: "work",
            name: "wow",
            items: [
              {
                type: "app",
                id: "haha",
              },
              {
                type: "app",
                id: "not-existed",
              },
              {
                type: "custom",
                id: "inside-dir",
                name: "Inside Dir",
                url: "/inside/dir",
              },
              {
                type: "not-existed",
              } as any,
            ],
          },
          {
            type: "dir",
            id: "empty-dir",
            name: "Empty Dir",
            items: [],
          },
          {
            type: "custom",
            id: "custom-id",
            name: "Custom Name",
            url: "/custom/url",
          },
          {
            type: "not-existed",
          } as any,
        ],
      },
    ];
    const wrapper = shallow(
      <IsolatedDesktopSlider
        microApps={apps}
        desktops={desktops}
        arrowWidthPercent={9}
      />
    );
    expect(wrapper.find(Desktop).length).toBe(1);
    expect(wrapper.find(Desktop).prop("desktop")).toMatchInlineSnapshot(`
      Object {
        "items": Array [
          Object {
            "app": Object {
              "homepage": "/hello",
              "id": "hello",
              "name": "world",
            },
            "id": "hello",
            "type": "app",
          },
          Object {
            "id": "work",
            "items": Array [
              Object {
                "app": Object {
                  "homepage": "/xixi",
                  "id": "haha",
                  "name": "hehe",
                },
                "id": "haha",
                "type": "app",
              },
              Object {
                "id": "inside-dir",
                "name": "Inside Dir",
                "type": "custom",
                "url": "/inside/dir",
              },
            ],
            "name": "wow",
            "type": "dir",
          },
          Object {
            "id": "custom-id",
            "name": "Custom Name",
            "type": "custom",
            "url": "/custom/url",
          },
        ],
        "name": "MyDesktop One",
      }
    `);
  });
});

describe("Mount DesktopSlider", () => {
  // Need the isolate modules cause `rememberedDesktopCursor`.
  let IsolatedDesktopSlider: typeof DesktopSlider;
  beforeEach(() => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      IsolatedDesktopSlider = require("./DesktopSlider").DesktopSlider;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const apps: MicroApp[] = [
    {
      id: "hello",
      name: "世界",
      localeName: "world",
      homepage: "/hello",
    },
    {
      id: "haha",
      name: "呵呵",
      localeName: "hehe",
      homepage: "/xixi",
    },
    {
      id: "rest",
      name: "其它",
      localeName: "rest",
      homepage: "/rest",
    },
  ];
  const desktops: DesktopData[] = [
    {
      items: [
        {
          type: "app",
          id: "hello",
        },
        {
          type: "dir",
          id: "work",
          name: "wow",
          items: [
            {
              type: "app",
              id: "haha",
            },
          ],
        },
        {
          type: "app",
          id: "rest",
        },
      ],
    },
  ];

  it.each<[string, number]>([
    ["ArrowRight", 0],
    ["ArrowDown", 0],
    ["ArrowLeft", 2],
    ["ArrowUp", 2],
    ["a", -1],
  ])("when press %s, new active should be %d", (key, index) => {
    const wrapper = mount(
      <IsolatedDesktopSlider
        microApps={apps}
        desktops={desktops}
        arrowWidthPercent={9}
      />
    );
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key,
        })
      );
    });
    wrapper.update();
    expect(wrapper.find("Desktop").prop("activeIndex")).toBe(index);
  });
});
