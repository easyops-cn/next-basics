import ReactDOM from "react-dom";
import "./";

const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.dynamic-content", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.dynamic-content"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
