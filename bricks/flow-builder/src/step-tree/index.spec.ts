import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("flow-builder.step-tree", () => {
  it("should create a custom element", () => {
    const element = document.createElement("flow-builder.step-tree");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");

    const contextMenuFactory =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.value.contextMenuFactory;

    contextMenuFactory({ data: { name: "step1", id: "step1", type: "task" } })({
      clientX: 20,
      clientY: 30,
      preventDefault: jest.fn(),
    });

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      {
        active: true,
        node: { name: "step1", id: "step1", type: "task" },
        x: 20,
        y: 30,
      }
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
