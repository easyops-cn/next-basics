import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("presentational-bricks.brick-alert-status", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-alert-status"
    ) as any;
    element.dataSource = {};
    element.fields = {};
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    element.status = 1;
    element.recoverType = "";
    await new Promise(setImmediate);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
