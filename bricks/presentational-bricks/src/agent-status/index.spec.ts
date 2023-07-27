import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.agent-status", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.agent-status"
    ) as any;
    // Always waiting for async `(dis)connectedCallback`
    element.value = "";
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    element.dataSource = {};
    element.fields = {};
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
