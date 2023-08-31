import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.general-cascader", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.general-cascader");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");
    const props =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props;
    props.onChange();
    await (global as any).flushPromises();
    expect(spyOnDispatch).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();

    props.dropdownVisibleChange();
    await (global as any).flushPromises();
    expect(spyOnDispatch).toBeCalled();

    props.optionsChange([{ label: "test", value: 1 }], "test");
    await (global as any).flushPromises();
    expect(spyOnDispatch).lastCalledWith(
      expect.objectContaining({
        type: "cascader.options.change",
        detail: { options: [{ label: "test", value: 1 }], name: "test" },
      })
    );
  });
});
