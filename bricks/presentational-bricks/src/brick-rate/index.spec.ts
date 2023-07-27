import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("presentational-bricks.brick-rate", () => {
  it("should create a custom element", () => {
    const element = document.createElement("presentational-bricks.brick-rate");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
  it("should trggier event", async () => {
    const element = document.createElement("presentational-bricks.brick-rate");
    await jest.runAllTimers();
    document.body.appendChild(element);
    const dispatchEvent = jest.spyOn(element, "dispatchEvent");
    const value = 3;
    const props =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props;
    props.onChange(value);
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({ type: "rate.change", detail: value })
    );
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
