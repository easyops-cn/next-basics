import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("developers.provider-group-menu", () => {
  it("should create a custom element", () => {
    const element = document.createElement("developers.provider-group-menu");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");

    const component =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children;

    component.props.onFold(true);
    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).detail).toEqual(
      true
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
