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
    );
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
