import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation((() => null) as any);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => null) as any);

describe("brick-tree", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.brick-tree");
    const dispatchEvent = jest.spyOn(element, "dispatchEvent");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      dataSource: [
        {
          title: "0",
          key: "0",
          children: [
            {
              title: "0-0",
              key: "00",
            },
          ],
        },
        {
          title: "1",
          key: "1",
          children: [
            {
              title: "1-0",
              key: "10",
            },
          ],
        },
      ],
      configProps: {
        checkable: true,
      },
      searchable: true,
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();

    const props =
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0].props
        .children.props;
    props.onSearch("kkk");
    await (global as any).flushPromises();
    expect(dispatchEvent).lastCalledWith(
      expect.objectContaining({
        type: "tree.search",
        detail: "kkk",
      })
    );
  });
});
