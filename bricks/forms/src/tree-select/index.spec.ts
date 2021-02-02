import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.tree-select", () => {
  it("should create a custom element", () => {
    const element = document.createElement("forms.tree-select");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    const value = [];
    const label = [];
    const extra = {};
    spyOnRender.mock.calls[
      spyOnRender.mock.calls.length - 1
    ][0].props.children.props.onChange(value, label, extra);
    expect(sypOnDispatchEvent).lastCalledWith(
      expect.objectContaining({
        type: "treeSelect.change",
        detail: expect.objectContaining({ value, label, extra }),
      })
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
