import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
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

    const props =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0].props
        .children.props;
    const value = ["a"];
    props.onChange(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({ type: "general.radio.change", detail: value })
    );
    props.onChangeV2(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({
        type: "general.radio.change.v2",
        detail: value,
      })
    );

    props.optionsChange([{ label: "test", value: 1 }], "test");
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({
        type: "general.radio.options.change",
        detail: { options: [{ label: "test", value: 1 }], name: "test" },
      })
    );
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
