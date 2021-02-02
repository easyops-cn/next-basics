import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("presentational-bricks.brick-quick-entries", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-quick-entries"
    ) as any;

    Object.assign(element, {
      row: null,
      column: null,
      links: null
    });

    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    element.showCard = false;
    await new Promise(setImmediate);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
