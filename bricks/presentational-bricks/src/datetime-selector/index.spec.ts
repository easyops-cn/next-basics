import ReactDOM from "react-dom";
import * as kit from "@next-core/brick-kit";
import "./";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});

const replaceMock = jest.fn();
const spyOnHistory = jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {
    pathname: "/developer",
    search: "?q=a&page=1"
  },
  replace: replaceMock
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.datetime-selector", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.datetime-selector"
    ) as any;

    element.from = null;
    element.to = null;
    element.shouldUpdateUrlParams = null;

    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should work if time Selector change", async () => {
    const element = document.createElement(
      "presentational-bricks.datetime-selector"
    );

    await jest.runAllTimers();
    document.body.appendChild(element);

    element.datetimeSelected({ type: "dateRange", value: "now-30d" });
    expect(replaceMock.mock.calls[0][0]).toEqual("?q=a&page=1&from=now-30d");

    element.datetimeSelected({
      type: "specifiedDate",
      value: { from: 1571673600000, to: 1571846399000 }
    });
    expect(replaceMock.mock.calls[1][0]).toEqual(
      "?q=a&page=1&from=1571673600000&to=1571846399000"
    );
  });
});
