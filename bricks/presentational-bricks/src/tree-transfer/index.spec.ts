import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.tree-transfer", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.tree-transfer"
    ) as any;
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();

    element.dataSource = [
      { key: "t1", title: "t1" },
      { key: "t2", title: "t2" },
      { key: "t3", title: "t3" },
    ];
    element.handleChange([]);
    // element.notifyChange();
    await (global as any).flushPromises();

    // element.realTimeNotification = false;
    element.handleChange([]);
    element.handleChange(["t3"]);

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
