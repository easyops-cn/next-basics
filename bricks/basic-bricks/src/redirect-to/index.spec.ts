import * as kit from "@next-core/brick-kit";
import "./";

const spyOnHistoryReplace = jest.fn();
jest.spyOn(kit, "getHistory").mockReturnValue({
  replace: spyOnHistoryReplace
} as any);

describe("redirect-to", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.redirect-to");
    (element as any).href = "/next";
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnHistoryReplace).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnHistoryReplace).toBeCalledWith("/next");
    document.body.removeChild(element);
  });

  it("should use href2", async () => {
    const element = document.createElement("basic-bricks.redirect-to");
    (element as any).href = "/next";
    (element as any).href2 = "/next2";
    (element as any).useHref2 = true;
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnHistoryReplace).toBeCalledWith("/next2");
    document.body.removeChild(element);
  });

});
