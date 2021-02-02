import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  // empty
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    // empty
  }) as any);

  jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("presentational-bricks.cost-time", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.cost-time");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      cost: 873,
      startTime: "2019-1-19 06:00:00",
      endTime: "2019-1-19 12:00:00",
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    Object.assign(element, {
      dataSource: {
        costTime: 123,
        startTime: "2019-10-19 18:13:18",
        endTime: "2019-10-19 18:13:21",
      },
    });
    await jest.runAllTimers();
    Object.assign(element, {
      fields: {
        startTime: "startTime",
        endTime: "endTime",
      },
    });
    await jest.runAllTimers();
    Object.assign(element, {
      fields: {
        cost: "costTime",
      },
    });
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
