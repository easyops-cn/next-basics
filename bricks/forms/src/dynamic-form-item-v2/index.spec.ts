import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.dynamic-form-item-v2", () => {
  it("should create a custom element", () => {
    const element = document.createElement("forms.dynamic-form-item-v2");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should trigger event", async () => {
    const element = document.createElement("forms.dynamic-form-item-v2");
    document.body.appendChild(element);
    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");
    const props =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props;

    props.onChange();
    expect(
      (
        sypOnDispatchEvent.mock.calls[
          sypOnDispatchEvent.mock.calls.length - 1
        ][0] as CustomEvent
      ).type
    ).toEqual("item.change");

    props.onAdd();
    expect(
      (
        sypOnDispatchEvent.mock.calls[
          sypOnDispatchEvent.mock.calls.length - 1
        ][0] as CustomEvent
      ).type
    ).toEqual("row.add");

    props.onRemove();
    expect(
      (
        sypOnDispatchEvent.mock.calls[
          sypOnDispatchEvent.mock.calls.length - 1
        ][0] as CustomEvent
      ).type
    ).toEqual("row.remove");
  });
});
