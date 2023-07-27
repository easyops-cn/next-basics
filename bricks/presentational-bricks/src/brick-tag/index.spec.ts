/* eslint-disable @typescript-eslint/no-empty-function */
import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("brick-tag", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("presentational-bricks.brick-tag");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      showCard: true,
      componentType: "CheckableTag",
      tagList: ["a", "b", "c"],
      configProps: {
        closable: true,
        color: "#108ee9",
      },
      fields: {
        label: "name",
        key: "id",
      },
      textEllipsis: true,
      tagStyle: {
        color: "#ffffff",
      },
      tagCheckedStyle: {
        color: "#cccccc",
      },
      tagHoverStyle: {
        cursor: "pointer",
      },
      multipleCheck: false,
      dataSource: [
        {
          name: "kk",
          id: "1",
        },
        {
          name: "ly",
          id: "2",
        },
      ],
      label: "label: ",
      default: "b",
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      showCard: false,
      componentType: "Tag",
      fields: {
        label: "name",
        key: "id",
        dataSource: "input",
      },
      dataSource: {
        input: [],
      },
    });
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "tag.click" when handleOnClick has been called"`, async () => {
    const mockEventListener = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    Object.assign(element, {
      showCard: false,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
      ],
    });
    element.addEventListener("tag.click", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnClick();
    expect(mockEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
  });

  it(`should dispatch "tag.close" when handleOnClose has been called"`, async () => {
    const mockEventListener = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    Object.assign(element, {
      showCard: false,
      closable: true,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
      ],
    });
    element.addEventListener("tag.close", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    const current = { key: "a", label: "a" };
    const tagList = [
      { key: "b", label: "b" },
      { key: "c", label: "c" },
    ];
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnClose(current, tagList);
    expect(mockEventListener).toHaveBeenCalled();
    document.body.removeChild(element);
  });

  it(`should dispatch "checked.update" and "checked.update.v2"  when handleOnClose has been called"`, async () => {
    const mockEventListener = jest.fn((e) => {});
    const mockEventListenerV2 = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    Object.assign(element, {
      showCard: false,
      componentType: "CheckableTag",
      tagList: ["a", "b", "c"],
      configProps: {
        closable: true,
        color: "#108ee9",
      },
      fields: {
        label: "name",
        key: "id",
      },
      textEllipsis: true,
      tagStyle: {
        color: "#ffffff",
      },
      tagCheckedStyle: {
        color: "#cccccc",
      },
      tagHoverStyle: {
        cursor: "pointer",
      },
      multipleCheck: false,
      dataSource: [
        {
          name: "kk",
          id: "1",
        },
        {
          name: "ly",
          id: "2",
        },
      ],
      label: "label: ",
      default: "b",
    });
    element.addEventListener("checked.update", mockEventListener);
    element.addEventListener("checked.update.v2", mockEventListenerV2);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnChange({ label: "kk", key: "1" });
    expect(mockEventListener).toHaveBeenCalled();
    expect(mockEventListenerV2).toHaveBeenCalled();
    document.body.removeChild(element);
  });
});
