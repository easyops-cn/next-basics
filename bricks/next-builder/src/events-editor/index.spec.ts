import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.events-editor", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("next-builder.events-editor") as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);

    element.eventDocInfo = [
      {
        description: "表单验证成功时触发事件",
        detail: {
          type: "Record<string, unknown>",
        },
        name: "validate.success",
      },
    ];
    await jest.runAllTimers();
    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children["props"].eventDocInfo
    ).toEqual([
      {
        description: "表单验证成功时触发事件",
        detail: undefined,
        name: "validate.success",
        type: "validate.success",
      },
    ]);

    element.eventDocInfo = [
      {
        description: "表单验证成功时触发",
        detail: "Record<string, any>",
        type: "validate.success",
      },
    ];
    await jest.runAllTimers();
    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children["props"].eventDocInfo
    ).toEqual([
      {
        description: "表单验证成功时触发",
        detail: "Record<string, any>",
        type: "validate.success",
      },
    ]);

    const editorRefMock = {
      addEventHandler: jest.fn(),
      editEventHandler: jest.fn(),
      removeEventHandler: jest.fn(),
    };

    element._editorRef = {
      current: editorRefMock,
    };

    element.addEventHandler();
    expect(editorRefMock.addEventHandler).toHaveBeenCalled();

    element.editEventHandler();
    expect(editorRefMock.editEventHandler).toHaveBeenCalled();

    element.removeEventHandler();
    expect(editorRefMock.removeEventHandler).toHaveBeenCalled();

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onCreate();

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "event.create"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onEdit();

    expect((sypOnDispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "event.edit"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange();

    expect((sypOnDispatchEvent.mock.calls[2][0] as CustomEvent).type).toEqual(
      "event.change"
    );

    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
