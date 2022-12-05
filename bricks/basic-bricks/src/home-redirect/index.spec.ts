import * as kit from "@next-core/brick-kit";
import { RuntimeApi_searchMicroAppStandalone } from "@next-sdk/micro-app-standalone-sdk";
import "./";

jest.spyOn(kit, "getRuntime").mockReturnValue({
  getMicroApps: () => [
    {
      id: "search",
      homepage: "/search",
    },
    {
      id: "no-homepage",
    },
  ],
} as any);
const spyOnReplace = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  replace: spyOnReplace,
} as any);

jest.mock("@next-sdk/micro-app-standalone-sdk");
const mockSearchMicroAppStandalone =
  RuntimeApi_searchMicroAppStandalone as jest.MockedFunction<
    typeof RuntimeApi_searchMicroAppStandalone
  >;

const location = window.location;

describe("basic-bricks.home-redirect", () => {
  let element: any;

  beforeEach(async () => {
    element = document.createElement("basic-bricks.home-redirect");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    window.STANDALONE_MICRO_APPS = undefined;
    delete window.location;
    window.location = location;
  });

  afterEach(() => {
    document.body.removeChild(element);
    spyOnReplace.mockClear();
  });

  it("should redirect to app homepage", async () => {
    element.appId = "search";
    await (global as any).flushPromises();
    expect(spyOnReplace).toBeCalledWith("/search");
  });

  it("should do nothing if no specific redirectUrl and app has no homepage", async () => {
    element.appId = "no-homepage";
    await jest.runAllTimers();
    expect(spyOnReplace).not.toBeCalled();
  });

  it("should do nothing if app not found and not rediectUrl", async () => {
    element.appId = "not-found";
    await jest.runAllTimers();
    expect(spyOnReplace).not.toBeCalled();
  });

  it("should redicect to specific url if app not found", async () => {
    element.appId = "not-found";
    element.redirectUrl = "/some-homepage";
    await jest.runAllTimers();
    expect(spyOnReplace).toBeCalledWith("/some-homepage");
  });

  it("should redicect to specific url, standalone mode", async () => {
    window.STANDALONE_MICRO_APPS = true;
    delete window.location;
    window.location = {
      origin: location.origin,
      replace: jest.fn(),
      reload: jest.fn(),
      assign: jest.fn(),
    } as unknown as Location;

    element.appId = "search";
    element.redirectUrl = "/some-homepage";
    await jest.runAllTimers();
    expect(window.location.replace).toBeCalledWith("some-homepage");
  });

  it("should redicect to app, standalone mode", async () => {
    window.STANDALONE_MICRO_APPS = true;
    delete window.location;
    window.location = {
      origin: location.origin,
      replace: jest.fn(),
      reload: jest.fn(),
      assign: jest.fn(),
    } as unknown as Location;
    mockSearchMicroAppStandalone.mockResolvedValueOnce({
      list: [
        {
          appId: "search",
          currentVersion: "1.0.1",
          installStatus: "ok",
          homepage: "/search",
        },
      ],
      total: 1,
    });
    element.appId = "search";
    await jest.runAllTimers();
    expect(mockSearchMicroAppStandalone).toBeCalledWith({
      query: { appId: "search", installStatus: { $ne: "running" } },
      fields: ["appId", "homepage", "installStatus"],
    });
    expect(spyOnReplace).not.toBeCalled();
  });

  it("should do nothing if no specific redirectUrl and app has no homepage, standalone mode", async () => {
    window.STANDALONE_MICRO_APPS = true;
    mockSearchMicroAppStandalone.mockResolvedValueOnce({
      list: [
        { appId: "no-homepage", currentVersion: "1.0.1", installStatus: "ok" },
      ],
      total: 1,
    });
    element.appId = "no-homepage";
    await jest.runAllTimers();
    expect(spyOnReplace).not.toBeCalled();
  });

  it("should do nothing if no specific redirectUrl and app not found, standalone mode", async () => {
    window.STANDALONE_MICRO_APPS = true;
    mockSearchMicroAppStandalone.mockResolvedValueOnce({
      list: [],
      total: 0,
    });
    element.appId = "not-found";
    await jest.runAllTimers();
    expect(spyOnReplace).not.toBeCalled();
  });
});
