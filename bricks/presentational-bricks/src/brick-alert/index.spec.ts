import ReactDOM from "react-dom";
import * as kit from "@next-core/brick-kit";
import "./";

jest
  .spyOn(kit, "getHistory")
  .mockReturnValue({ location: { pathname: "/x/y/z" } } as any);

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("presentational-bricks.brick-alert", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-alert"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    element.localStorageKey = "x";
    element.onClose();
    await (global as any).flushPromises();

    element.onClose();
    expect(element.style.display).toBe("none");

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
