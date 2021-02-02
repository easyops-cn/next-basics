import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  //
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    //
  }) as any);

jest.spyOn(console, "warn").mockImplementation(() => void 0);

const props = {
  fields: {
    value: "value",
    mode: "mode"
  },
  required: true,
  mode: "json",
  theme: "tomorrow",
  setOptions: {
    maxLines: Infinity
  },
  editorProps: { $blockScrolling: Infinity },
  configProps: {
    debounceChangePeriod: 500
  },
  dataSource: {
    value: "123",
    mode: "json"
  },
  editorStyle: {
    width: "100%"
  }
};

describe("presentational-bricks.code-editor", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.code-editor");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      value: "123"
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "code.change" when handleChange has been called"`, async () => {
    const element = document.createElement("presentational-bricks.code-editor");
    Object.assign(element, props, {
      fields: {},
      dataSource: "123"
    });
    const mockEventListener = jest.fn();
    element.addEventListener("code.change", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleChange("456");
    expect(mockEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
  });

  it(`should dispatch "editor.blur" when handleBlur has been called"`, async () => {
    const element = document.createElement("presentational-bricks.code-editor");
    Object.assign(element, props, {
      fields: undefined,
      dataSource: "123"
    });
    const mockEventListener = jest.fn();
    element.addEventListener("editor.blur", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleBlur("456");
    expect(mockEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
  });

  it(`should dispatch "code.error.change" when handleErrorChange has been called"`, async () => {
    const element = document.createElement("presentational-bricks.code-editor");
    Object.assign(element, props);
    const mockEventListener = jest.fn();
    element.addEventListener("code.error.change", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleErrorChange(true);
    expect(mockEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
  });
});
