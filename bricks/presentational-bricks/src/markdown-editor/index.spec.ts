import ReactDOM from "react-dom";
import ".";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {
  /* do nothing */
});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {
    /* do nothing */
  }) as any);

describe("presentational-bricks.markdown-editor", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.markdown-editor"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      dataSource: "### 123"
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      fields: {
        value: "readme"
      },
      dataSource: { readme: "### 123" }
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should trigger event", async () => {
    const element = document.createElement(
      "presentational-bricks.markdown-editor"
    ) as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element.handleChange("test");

    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual(
      "test"
    );
  });
});
