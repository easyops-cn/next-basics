import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("forms.general-radio", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.general-radio");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    const props = spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0].props
    .children.props;
    const value = ['a'];
    props.onChange(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({ type: "general.radio.change", detail: value })
    );

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
