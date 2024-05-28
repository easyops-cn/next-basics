import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.workbench-brick-tree", () => {
  it("should create a custom element", () => {
    const element = document.createElement("next-builder.workbench-brick-tree");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyonDispatchEvent = jest.spyOn(element, "dispatchEvent");

    const elementProps =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.children.props.children.props;

    elementProps.onAddBrickDrop({
      nodeData: { originBrick: { id: "forms.general-form" } },
    });

    expect((spyonDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "add.brick"
    );

    elementProps.onAddBrickDrop({
      nodeData: {
        originBrick: { id: "forms.general-form" },
        dragType: "dataModel",
      },
    });
    expect((spyonDispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "data.model.drop"
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
