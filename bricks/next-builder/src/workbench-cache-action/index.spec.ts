import ReactDOM from "react-dom";
import ".";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.workbench-cache-action", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "next-builder.workbench-cache-action"
    ) as any;
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const mockShowMessage = jest.fn();
    const mockBuild = jest.fn();
    element._backendRef = {
      current: {
        showMessage: mockShowMessage,
        build: mockBuild,
      },
    };

    const spyOnDispatch = jest.spyOn(element, "dispatchEvent");

    const component =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0]["props"]
        .children.props.children;

    component.props.onSnippetSuccess({
      flattenNodeDetails: [
        {
          brick: "forms.general-form",
        },
      ],
    });
    expect((spyOnDispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      flattenNodeDetails: [{ brick: "forms.general-form" }],
    });

    element.showMessage({ content: "hello world" });

    expect(mockShowMessage).toHaveBeenCalledWith({
      content: "hello world",
      show: true,
    });

    element.build();

    expect(mockBuild).toHaveBeenCalled();

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });
});
