import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("developers.provider-group-list", () => {
  it("should create a custom element", () => {
    const element = document.createElement("developers.provider-group-list");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");

    const component =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children;

    component.props.onClick("cmdb", "instance");
    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      group: "instance",
      namespace: "cmdb",
    });

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
