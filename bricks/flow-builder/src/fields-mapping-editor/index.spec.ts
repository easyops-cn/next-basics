import ReactDOM from "react-dom";
import "./";
jest.mock("@next-libs/code-editor-components", () => ({
  CodeEditorItemWrapper: function CodeEditorItemWrapper() {
    return null;
  },
}));

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("flow-builder.fields-mapping-editor", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "flow-builder.fields-mapping-editor"
    ) as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);

    const sypOnDispatchEvent = jest.spyOn(element, "dispatchEvent");

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onChange();

    expect((sypOnDispatchEvent.mock.calls[0][0] as CustomEvent).type).toEqual(
      "values.change"
    );

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onRowEdit();

    expect((sypOnDispatchEvent.mock.calls[1][0] as CustomEvent).type).toEqual(
      "row.edit"
    );

    const mockSetData = jest.fn();
    element._editorRefs = {
      current: {
        setRowData: mockSetData,
      },
    };

    element.setRowData({ name: "name" });
    expect(mockSetData).toHaveBeenCalled();

    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
