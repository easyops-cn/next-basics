import ReactDOM from "react-dom";
import "./";
import { MicroViewElement } from "./";
import * as brickKit from "@next-core/brick-kit";

const brandFn = jest.fn().mockReturnValue({});
const featureFlagsFn = jest.fn().mockReturnValue({
  "support-ui-8.0-base-layout": true,
});

const getNavConfigFn = jest.fn().mockReturnValue({
  subMenu: {
    defaultCollapsed: undefined,
    defaultCollapsedBreakpoint: 0,
    icon: { category: "monitor", icon: "alert-rule", lib: "easyops" },
    link: "/events/alert-rule-1",
    menuItems: [
      {
        items: [
          {
            activeExcludes: [],
            activeIncludes: [],
            activeMatchSearch: false,
            children: [],
            creator: "easyops",
            ctime: "2022-06-16 14:22:46",
            defaultExpanded: false,
            deleteAuthorizers: [],
            exact: false,
            icon: {
              category: "app",
              icon: "monitor-auto-recovery",
              lib: "easyops",
            },
            instanceId: "12323",
            org: 8888,
            readAuthorizers: [],
            sort: 0,
            text: "test",
            to: "/auto-recovery",
            type: "default",
          },
        ],
        title: "事件处理",
        type: "group",
      },
    ],
  },
} as any);
jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getBrandSettings: brandFn,
  getFeatureFlags: featureFlagsFn,
  getNavConfig: getNavConfigFn,
} as any);

const spyOnRender = jest.spyOn(ReactDOM, "render");
const unmountComponentAtNode = jest.spyOn(ReactDOM, "unmountComponentAtNode");

describe("micro-app", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "basic-bricks.micro-app"
    ) as MicroViewElement;

    // Always waiting for async `(dis)connectedCallback`
    await (global as any).flushPromises();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await (global as any).flushPromises();
    expect(spyOnRender).toBeCalled();

    const subMenuElement = document.createElement("div");
    subMenuElement.setAttribute("slot", "subMenu");
    expect(element.hasSubMenu).toBe(false);
    element.append(subMenuElement);
    await (global as any).flushPromises();
    expect(element.hasSubMenu).toBe(true);

    const titleBarElement = document.createElement("div");
    titleBarElement.setAttribute("slot", "titleBar");
    expect(element.hasTitleBar).toBe(false);
    element.append(titleBarElement);
    await (global as any).flushPromises();
    expect(element.hasTitleBar).toBe(true);

    const toolbarElement = document.createElement("div");
    toolbarElement.setAttribute("slot", "toolbar");
    expect(element.hasToolbar).toBe(false);
    element.append(toolbarElement);
    await (global as any).flushPromises();
    expect(element.hasToolbar).toBe(true);

    const bannerElement = document.createElement("div");
    bannerElement.setAttribute("slot", "banner");
    expect(element.hasBanner).toBe(false);
    element.append(bannerElement);
    await (global as any).flushPromises();
    expect(element.hasBanner).toBe(true);

    const bannerPageTitleElement = document.createElement("div");
    bannerPageTitleElement.setAttribute("slot", "bannerTitleBar");
    expect(element.hasBannerTitleBar).toBe(false);
    element.append(bannerPageTitleElement);
    await (global as any).flushPromises();
    expect(element.hasBannerTitleBar).toBe(true);

    const bannerToolbarElement = document.createElement("div");
    bannerToolbarElement.setAttribute("slot", "bannerToolbar");
    expect(element.hasBannerToolbar).toBe(false);
    element.append(bannerToolbarElement);
    await (global as any).flushPromises();
    expect(element.hasBannerToolbar).toBe(true);

    document.body.removeChild(element);
    await (global as any).flushPromises();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
