import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("developers.v3-next-example", () => {
  it("should create a custom element", () => {
    const element = document.createElement("developers.v3-next-example");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");

    const component =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children;

    component.props.onBlur("{}", "json");
    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      code: "{}",
      mode: "json",
    });
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
