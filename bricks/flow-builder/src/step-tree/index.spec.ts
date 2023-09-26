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
      stopPropagation: jest.fn(),
    });

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      {
        active: true,
        node: { name: "step1", id: "step1", type: "task" },
        x: 20,
        y: 30,
      }
    );

    const onNodeToggle =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.value.onNodeToggle;

    onNodeToggle("step1", true);

    expect((sypOnDispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      { collapsed: true, nodeId: "step1" }
    );

    const getCollapsedId =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.value.getCollapsedId;

    expect(
      getCollapsedId({
        key: "abc123",
        name: "step1",
        id: "step1",
        type: "task",
      })
    ).toEqual("abc123");

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
