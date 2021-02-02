import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

  jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("brick-code-display", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-code-display"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      value: "",
      field: "value",
      dataSource: {
        value: "const a = 1;"
      },
      language: "javascript",
      showLineNumber: true
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
