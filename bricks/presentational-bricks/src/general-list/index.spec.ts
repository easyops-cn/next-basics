import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.general-list", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-list"
    );
    // Always waiting for async `(dis)connectedCallback`
    element.isCardList = true;
    element.showCard = false;
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    element.showCard = true;
    await jest.runAllTimers();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
