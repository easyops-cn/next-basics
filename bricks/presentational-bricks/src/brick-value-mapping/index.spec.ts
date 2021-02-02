import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("presentational-bricks.brick-value-mapping", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-value-mapping"
    ) as any;
    element.dataSource = {};
    element.fields = { value: "" };
    element.mapping = {};
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    element.value = "1";
    element.handleClick();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
