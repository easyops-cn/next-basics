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

  it("should normalize string tagList", async () => {
    const element = document.createElement("presentational-bricks.brick-tag");
    Object.assign(element, {
      showCard: false,
      tagList: ["a", "b"],
    });
    document.body.appendChild(element);
    await jest.runAllTimers();

    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.tagList
    ).toEqual([
      { key: "a", label: "a" },
      { key: "b", label: "b" },
    ]);
    document.body.removeChild(element);
  });

  it("should reset internal closed state when tagList is assigned again", async () => {
    const element = document.createElement("presentational-bricks.brick-tag");
    const tagList = [
      { key: "a", label: "a" },
      { key: "b", label: "b" },
    ];
    Object.assign(element, {
      showCard: false,
      closable: true,
      tagList,
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnClose(tagList[0], [tagList[1]]);
    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.tagList
    ).toEqual([tagList[1]]);

    const reassignedTagList = [
      { key: "a", label: "a" },
      { key: "b", label: "b" },
    ];
    Object.assign(element, {
      tagList: reassignedTagList,
    });
    await jest.runAllTimers();

    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.tagList
    ).toEqual([
      { ...reassignedTagList[0], icon: undefined },
      { ...reassignedTagList[1], icon: undefined },
    ]);
    document.body.removeChild(element);
  });

  it(`should dispatch "tag.close.confirm" before close and confirm close by method`, async () => {
    const closeListener = jest.fn((e) => {});
    const confirmListener = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    Object.assign(element, {
      showCard: false,
      closable: true,
      confirmBeforeClose: true,
      tagList: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
      ],
    });
    element.addEventListener("tag.close", closeListener);
    element.addEventListener("tag.close.confirm", confirmListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    const current = { key: "a", label: "a" };
    const tagList = [
      { key: "b", label: "b" },
      { key: "c", label: "c" },
    ];
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnCloseConfirm(current, tagList);

    expect(confirmListener).toHaveBeenCalledTimes(1);
    expect(closeListener).not.toHaveBeenCalled();
    expect(confirmListener.mock.calls[0][0].detail).toEqual({
      current,
      tagList,
      requestId: "1",
    });

    (element as any).confirmClose("wrong-request-id");
    expect(closeListener).not.toHaveBeenCalled();

    (element as any).confirmClose("1");
    expect(closeListener).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          current,
          tagList,
        },
      })
    );
    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.tagList
    ).toEqual(tagList);
    document.body.removeChild(element);
  });

  it(`should keep multiple pending close requests by requestId`, async () => {
    const closeListener = jest.fn((e) => {});
    const confirmListener = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    const originalTagList = [
      { key: "a", label: "a" },
      { key: "b", label: "b" },
      { key: "c", label: "c" },
    ];
    Object.assign(element, {
      showCard: false,
      closable: true,
      confirmBeforeClose: true,
      tagList: originalTagList,
    });
    element.addEventListener("tag.close", closeListener);
    element.addEventListener("tag.close.confirm", confirmListener);
    document.body.appendChild(element);
    await jest.runAllTimers();

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnCloseConfirm(originalTagList[0], [
      originalTagList[1],
      originalTagList[2],
    ]);
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnCloseConfirm(originalTagList[1], [
      originalTagList[0],
      originalTagList[2],
    ]);

    expect(confirmListener).toHaveBeenCalledTimes(2);
    expect(confirmListener.mock.calls[0][0].detail.requestId).toBe("1");
    expect(confirmListener.mock.calls[1][0].detail.requestId).toBe("2");

    (element as any).confirmClose("1");
    expect(closeListener.mock.calls[0][0].detail).toEqual({
      current: originalTagList[0],
      tagList: [originalTagList[1], originalTagList[2]],
    });

    (element as any).confirmClose("2");
    expect(closeListener.mock.calls[1][0].detail).toEqual({
      current: originalTagList[1],
      tagList: [originalTagList[2]],
    });
    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.tagList
    ).toEqual([originalTagList[2]]);
    document.body.removeChild(element);
  });

  it(`should clear duplicate pending close requests for the same tag`, async () => {
    const closeListener = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    const originalTagList = [
      { key: "a", label: "a" },
      { key: "b", label: "b" },
    ];
    Object.assign(element, {
      showCard: false,
      closable: true,
      confirmBeforeClose: true,
      tagList: originalTagList,
    });
    element.addEventListener("tag.close", closeListener);
    document.body.appendChild(element);
    await jest.runAllTimers();

    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnCloseConfirm(originalTagList[0], [
      originalTagList[1],
    ]);
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnCloseConfirm(originalTagList[0], [
      originalTagList[1],
    ]);

    (element as any).confirmClose("1");
    (element as any).confirmClose("2");

    expect(closeListener).toHaveBeenCalledTimes(1);
    expect(closeListener.mock.calls[0][0].detail).toEqual({
      current: originalTagList[0],
      tagList: [originalTagList[1]],
    });
    document.body.removeChild(element);
  });

  it(`should cancel pending close`, async () => {
    const closeListener = jest.fn((e) => {});
    const confirmListener = jest.fn((e) => {});
    const element = document.createElement("presentational-bricks.brick-tag");
    const originalTagList = [
      { key: "a", label: "a" },
      { key: "b", label: "b" },
    ];
    Object.assign(element, {
      showCard: false,
      closable: true,
      confirmBeforeClose: true,
      tagList: originalTagList,
    });
    element.addEventListener("tag.close", closeListener);
    element.addEventListener("tag.close.confirm", confirmListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleOnCloseConfirm(originalTagList[0], [
      originalTagList[1],
    ]);

    (element as any).cancelClose("1");
    (element as any).confirmClose("1");

    expect(confirmListener).toHaveBeenCalledTimes(1);
    expect(closeListener).not.toHaveBeenCalled();
    expect(
      spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
        "props"
      ].children.props.tagList
    ).toEqual(originalTagList);

    (element as any).confirmClose("1");
    (element as any).cancelClose("1");
    expect(closeListener).not.toHaveBeenCalled();
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
