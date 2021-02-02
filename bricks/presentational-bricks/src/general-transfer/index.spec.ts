import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.general-transfer", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-transfer"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();

    element.dataSource = [
      { key: "t1", title: "t1" },
      { key: "t2", title: "t2" },
      { key: "t3", title: "t3" }
    ];
    element.handleSelectedChange([], []);
    element.handleChange([]);

    element.dataDescriptor = { key: "key", title: "title" };
    element.maxSelected = 1;
    element.notifyChange();
    await new Promise(setImmediate);

    element.realTimeNotification = false;
    element.handleSelectedChange([], []);
    element.handleSelectedChange(["t1"], []);
    element.handleChange([]);
    element.handleChange(["t3"]);

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("coverage", async () => {
    spyOnRender.mockClear();
    const element = document.createElement(
      "presentational-bricks.general-transfer"
    ) as any;
    element.dataSource = [
      { key: "t1", title: "t1" },
      { key: "t2", title: "t2" },
      { key: "t3", title: "t3" }
    ];
    // element.maxSelected = 4;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
  });
});
