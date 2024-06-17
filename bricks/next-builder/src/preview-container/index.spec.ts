import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.preview-container", () => {
  it("should create a custom element", () => {
    const element = document.createElement("next-builder.preview-container");
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const spyonDispatchEvent = jest.spyOn(element, "dispatchEvent");

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onInspectSingleDataValueSuccess("test");

    expect((spyonDispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      "test"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onInspectAllDataValuesSuccess("hello");

    expect((spyonDispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual(
      "hello"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onInspectDataValueError("error");

    expect((spyonDispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual(
      "error"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onDebugValueSuccess({ name: "easyops" });

    expect((spyonDispatchEvent.mock.calls[3][0] as CustomEvent).detail).toEqual(
      { name: "easyops" }
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onDebugValueError("error");

    expect((spyonDispatchEvent.mock.calls[4][0] as CustomEvent).detail).toEqual(
      "error"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onPreviewerDrop({
      nodeData: { originBrick: { id: "forms.general-form" } },
    });
    expect((spyonDispatchEvent.mock.calls[5][0] as CustomEvent).type).toEqual(
      "preview.drop"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onPreviewerDrop({
      nodeData: {
        originBrick: { id: "forms.general-form" },
        dragType: "dataModel",
      },
    });
    expect((spyonDispatchEvent.mock.calls[6][0] as CustomEvent).type).toEqual(
      "data.model.drop"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.children.props.onRuntimeDataValue({
      app: {
        id: "cmdb",
        homepage: "/cmdb/list",
      },
    });
    expect((spyonDispatchEvent.mock.calls[7][0] as CustomEvent).type).toEqual(
      "inspect.runtime.value"
    );

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
