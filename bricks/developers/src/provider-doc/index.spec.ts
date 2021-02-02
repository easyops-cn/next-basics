import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  // do nothing
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    // do nothing
  }) as any);

describe("developers.provider-doc", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("developers.provider-doc");
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
});
