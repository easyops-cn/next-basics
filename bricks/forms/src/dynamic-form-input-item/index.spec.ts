import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.dynamic-form-input-item", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.dynamic-form-input-item");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element._handleChange([{ name: "jack", age: 18 }]);
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual([
      { age: 18, name: "jack" }
    ]);

    element._handleAdd();
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      null
    );

    element._handleRemove({ name: "lucy", age: 16 });
    expect((dispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual({
      name: "lucy",
      age: 16
    });

    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
