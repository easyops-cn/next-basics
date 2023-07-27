import ReactDOM from "react-dom";
import "./";
import { BrickLinkElement } from "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("presentational-bricks.brick-link", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-link"
    ) as BrickLinkElement;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.native = false;
    element.dataSource = { name: "bbb", id: "111" };
    element.labelField = "name";
    element.urlTemplate = "/resources/#{id}";
    element.replace = true;
    element.target = "_self";
    expect(spyOnRender).toBeCalled();
    element.label = "label";
    element.url = "url";
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
