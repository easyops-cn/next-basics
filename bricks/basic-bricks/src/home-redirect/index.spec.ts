import * as kit from "@next-core/brick-kit";
import "./";

jest.spyOn(kit, "getRuntime").mockReturnValue({
  getMicroApps: () => [
    {
      id: "search",
      homepage: "/search"
    },
    {
      id: "no-homepage"
    }
  ]
} as any);
const spyOnReplace = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  replace: spyOnReplace
} as any);

describe("basic-bricks.home-redirect", () => {
  let element: any;

  beforeEach(async () => {
    element = document.createElement("basic-bricks.home-redirect");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
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

  it("should do nothing if app has no homepage", async () => {
    element.appId = "no-homepage";
    await jest.runAllTimers();
    expect(spyOnReplace).not.toBeCalled();
  });

  it("should do nothing if app not found", async () => {
    element.appId = "not-found";
    await jest.runAllTimers();
    expect(spyOnReplace).not.toBeCalled();
  });
});
