import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppBarWrapper } from "./AppBarWrapper";
import { act } from "react-dom/test-utils";
import * as kit from "@next-core/brick-kit";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { NS_NAV_LEGACY } from "../i18n/constants";
import zhLocale from "../i18n/locales/zh";
import enLocale from "../i18n/locales/en";

// 本测试需验证真实文案及语言切换后的重渲染，恢复真实 i18next/react-i18next，
// 不使用仓库级 __mocks__ 中 `t: (key) => key` 的桩实现。
jest.unmock("i18next");
jest.unmock("react-i18next");
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

if (!i18next.isInitialized) {
  i18next.init({
    fallbackLng: "zh",
    supportedLngs: ["zh", "en"],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    resources: {},
  });
}
initReactI18next.init(i18next);
i18next.addResourceBundle("zh", NS_NAV_LEGACY, zhLocale, true, true);
i18next.addResourceBundle("en", NS_NAV_LEGACY, enLocale, true, true);

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
    await i18next.changeLanguage("zh");
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
    expect(container.textContent).toContain("离 License 过期还有 7 天");
    unmount();
  });

  it("should render license tips with English singular and plural forms", async () => {
    await i18next.changeLanguage("en");
    getFeatureFlags.mockReturnValue({
      "migrate-to-brick-next-v3": true,
    });
    mockGetAuth.mockReturnValue({
      license: {
        validDaysLeft: 1,
      },
      isAdmin: true,
    });
    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(container.textContent).toContain("License expires in 1 day");
    unmount();

    mockGetAuth.mockReturnValue({
      license: {
        validDaysLeft: 7,
      },
      isAdmin: true,
    });
    const plural = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(plural.container.textContent).toContain("License expires in 7 days");
    plural.unmount();
    await i18next.changeLanguage("zh");
  });

  it("license tips should follow language switching after mount", async () => {
    mockGetAuth.mockReturnValue({
      license: {
        validDaysLeft: 7,
      },
      isAdmin: true,
    });
    getFeatureFlags.mockReturnValue({
      "migrate-to-brick-next-v3": true,
    });
    await i18next.changeLanguage("zh");

    const { container, unmount } = render(
      <AppBarWrapper isFixed={true} displayCenter={true} />
    );
    expect(container.textContent).toContain("离 License 过期还有 7 天");

    // 切换到英文后，已挂载的吊顶应重新渲染为英文。
    await act(async () => {
      await i18next.changeLanguage("en");
    });
    expect(container.textContent).toContain("License expires in 7 days");

    // 再切回中文，确认事件订阅无残留、往返切换均正常。
    await act(async () => {
      await i18next.changeLanguage("zh");
    });
    expect(container.textContent).toContain("离 License 过期还有 7 天");

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
