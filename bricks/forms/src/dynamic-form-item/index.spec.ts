import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.dynamic-form-item", () => {
  it("should create a custom element", () => {
    const element = document.createElement("forms.dynamic-form-item");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");

    const component =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children;

    component.props.onChange([{ name: "jack", age: 18 }]);
    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).detail).toEqual([
      { age: 18, name: "jack" },
    ]);

    component.props.onRemove({ name: "lucy", age: 16 });
    expect((spyOnDispatch.mock.calls[1][0] as CustomEvent).detail).toEqual({
      name: "lucy",
      age: 16,
    });

    component.props.onAdd();
    expect((spyOnDispatch.mock.calls[2][0] as CustomEvent).detail).toEqual(
      null
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
