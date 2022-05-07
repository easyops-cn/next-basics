import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.contract-auto-complete", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "next-builder.contract-auto-complete"
    );
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");

    spyOnRender.mock.calls[0][0].props.children.props.onChange("flow.api");

    await (global as any).flushPromises();

    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).type).toEqual(
      "contract.change"
    );
    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).detail).toEqual(
      "flow.api"
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
