import * as kit from "@next-core/brick-kit";
import { http } from "@next-core/brick-http";
import * as authSdk from "@next-sdk/auth-sdk";
import { submitAsForm } from "./submitAsForm";
import "./";

jest.mock("@next-core/brick-http");
jest.mock("./submitAsForm");

let flags: Record<string, boolean> = {};
const spyOnLogout = jest.spyOn(kit, "logout");
const spyOnApiLogout = jest.spyOn(authSdk, "logout");
jest.spyOn(kit, "getRuntime").mockReturnValue({
  getFeatureFlags: () => flags,
} as any);

describe("general-logout", () => {
  afterEach(() => {
    spyOnApiLogout.mockReset();
    jest.clearAllMocks();
    flags = {};
  });

  it("should logout successfully", async () => {
    // TODO: not working `jest.useFakeTimers()` but have to set `timers: "fake"` in config
    // jest.useFakeTimers();
    const element = document.createElement("general-auth.general-logout");
    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    expect(spyOnLogout).not.toBeCalled();
    expect(spyOnDispatchEvent).not.toBeCalled();
    spyOnApiLogout.mockResolvedValueOnce(null);
    document.body.appendChild(element);
    // MutationObserver in jsdom uses promise,
    // While fake timers breaks with native promise.
    // Ref https://github.com/facebook/jest/issues/7151
    await (global as any).flushPromises();
    expect(spyOnLogout).toBeCalled();
    expect(spyOnDispatchEvent).toBeCalled();
    expect(submitAsForm).not.toBeCalled();
  });

  it("should trigger sso signout", async () => {
    flags["login-by-legacy-sso"] = true;
    (http.post as jest.Mock).mockResolvedValueOnce({});
    const element = document.createElement("general-auth.general-logout");
    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    expect(spyOnLogout).not.toBeCalled();
    expect(spyOnDispatchEvent).not.toBeCalled();
    spyOnApiLogout.mockResolvedValueOnce(null);
    document.body.appendChild(element);
    // MutationObserver in jsdom uses promise,
    // While fake timers breaks with native promise.
    // Ref https://github.com/facebook/jest/issues/7151
    await (global as any).flushPromises();
    expect(spyOnLogout).toBeCalled();
    expect(http.post).toBeCalled();
    expect(spyOnDispatchEvent).toBeCalled();
    expect(submitAsForm).not.toBeCalled();
  });

  it("should trigger sso signout and do post-signout", async () => {
    flags["login-by-legacy-sso"] = true;
    (http.post as jest.Mock).mockResolvedValueOnce({
      method: "post",
      url: "/sso/post-signout",
      data: {
        username: "007",
      },
    });
    const element = document.createElement("general-auth.general-logout");
    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    expect(spyOnLogout).not.toBeCalled();
    expect(spyOnDispatchEvent).not.toBeCalled();
    spyOnApiLogout.mockResolvedValueOnce(null);
    document.body.appendChild(element);
    // MutationObserver in jsdom uses promise,
    // While fake timers breaks with native promise.
    // Ref https://github.com/facebook/jest/issues/7151
    await (global as any).flushPromises();
    expect(spyOnLogout).toBeCalled();
    expect(http.post).toBeCalled();
    expect(submitAsForm).toBeCalledWith({
      method: "post",
      url: "/sso/post-signout",
      data: {
        username: "007",
      },
      target: "_self",
    });
    expect(spyOnDispatchEvent).not.toBeCalled();
  });

  it("should print errors if logout failed", async () => {
    const element = document.createElement("general-auth.general-logout");
    const spyOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    spyOnApiLogout.mockRejectedValueOnce(new Error("mock error"));
    document.body.appendChild(element);
    await (global as any).flushPromises();
    expect(spyOnLogout).not.toBeCalled();
    expect(spyOnDispatchEvent).not.toBeCalled();
    expect(element.textContent).toBe("Error: mock error");
  });
});
