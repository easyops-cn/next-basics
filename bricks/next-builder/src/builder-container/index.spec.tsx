import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => void 0);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.builder-container", () => {
  it("should create a custom element", () => {
    const element = document.createElement("next-builder.builder-container");
    (element as any).appId = "test-app";

    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
