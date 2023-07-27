import ReactDOM from "react-dom";
import "./";

jest.mock("./loginByLegacy");

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("general-login", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("general-auth.general-login");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalledTimes(1);
    (element as any).reset();
    expect(spyOnRender).toBeCalledTimes(2);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
