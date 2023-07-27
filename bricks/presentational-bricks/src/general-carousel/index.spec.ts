import ReactDOM from "react-dom";
import { GeneralCarouselElement } from "./";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.general-carousel", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.general-carousel"
    ) as GeneralCarouselElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    const components = [
      {
        brick: "div",
        properties: {
          textContent: "hello"
        }
      }
    ];
    element.setComponent(components);
    expect(element.components).toEqual([
      {
        brick: "div",
        properties: {
          textContent: "hello"
        }
      }
    ]);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element.handleClickEvent(6);
    const event = dispatchEvent.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual(6);

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
