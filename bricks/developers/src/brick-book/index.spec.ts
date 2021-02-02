import ReactDOM from "react-dom";
import "./";
import { BrickBookElement } from "./index";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("brick-book", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("developers.brick-book");
    (element as any).storyId = "x.y.z";
    (element as any).storyType = "brick";
    expect((element as any).storyId).toBe("x.y.z");
    expect((element as any).storyType).toBe("brick");
    (element as any).updateProperties({ type: "template", storyId: "a.b.c" });
    expect((element as any).storyId).toBe("a.b.c");
    expect((element as any).storyType).toBe("template");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("Do not show card", async () => {
    const element = document.createElement(
      "developers.brick-book"
    ) as BrickBookElement;

    element.storyId = "x.y.z";
    element.storyType = "brick";
    element.showCard = false;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
