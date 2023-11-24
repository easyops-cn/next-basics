import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppBarWrapper } from "./AppBarWrapper";
import { act } from "react-dom/test-utils";
import * as kit from "@next-core/brick-kit";

jest.mock("@next-core/brick-kit");

const mockGetRuntime = jest.spyOn(kit, "getRuntime");
const mockGetAuth = jest.spyOn(kit, "getAuth");
const getFeatureFlags = jest.fn();
const getMiscSettings = jest.fn();
mockGetRuntime.mockReturnValue({
  getFeatureFlags,
  getMiscSettings,
} as any);
jest.spyOn(kit, "useCurrentApp").mockReturnValue({
  isBuildPush: true,
} as any);

describe("AppBarWrapper", () => {
  it("should work", () => {
    getFeatureFlags.mockReturnValue({});
    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(
      container.querySelectorAll(".app-bar > :not(.app-bar-content)").length
    ).toBe(0);
    unmount();
  });

  it("should render tips in v2", async () => {
    getFeatureFlags.mockReturnValue({});
    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    act(() => {
      window.dispatchEvent(
        new CustomEvent("app.bar.tips", {
          detail: [
            {
              text: "hello world",
              tipKey: "unknown",
            },
          ],
        })
      );
    });
    expect(
      container.querySelectorAll(".app-bar > :not(.app-bar-content)").length
    ).toBe(1);
    unmount();
  });

  it("should render no tips in v3", async () => {
    getFeatureFlags.mockReturnValue({
      "migrate-to-brick-next-v3": true,
    });
    mockGetAuth.mockReturnValue({});
    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(
      container.querySelectorAll(".app-bar > :not(.app-bar-content)").length
    ).toBe(0);
    unmount();
  });

  it("should render license tips in v3", async () => {
    getFeatureFlags.mockReturnValue({
      "migrate-to-brick-next-v3": true,
    });
    mockGetAuth.mockReturnValue({
      license: {
        validDaysLeft: 7,
      },
      isAdmin: true,
    });
    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(
      container.querySelectorAll(".app-bar > :not(.app-bar-content)").length
    ).toBe(1);
    unmount();
  });

  it("should render router tips in v3", async () => {
    getFeatureFlags.mockReturnValue({
      "migrate-to-brick-next-v3": true,
    });
    getMiscSettings.mockReturnValue({
      loadTime: 3000,
    });
    mockGetAuth.mockReturnValue({});
    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    act(() => {
      window.dispatchEvent(
        new CustomEvent("route.render", {
          detail: { renderTime: 3567 },
        })
      );
    });
    expect(
      container.querySelectorAll(".app-bar > :not(.app-bar-content)").length
    ).toBe(1);
    unmount();
  });
});
