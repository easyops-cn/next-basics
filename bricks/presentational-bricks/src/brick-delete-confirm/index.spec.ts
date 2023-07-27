import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);
const mockEventListener = jest.fn(e => {});

describe("presentational-bricks.brick-delete-confirm", () => {
  it("should create a custom element", async () => {
    const element = document.createElement(
      "presentational-bricks.brick-delete-confirm"
    );
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    Object.assign(element, {
      disabled: true,
      deleteName: "主机",
      buttonConfig: {
        type: "danger",
        text: "删除主机"
      },
      fields: {
        name: "hostname",
        key: "instanceId",
        argsPath: "[1].instanceIds"
      },
      type: "object",
      dataSource: {
        hostname: "host",
        instanceId: "1"
      },
      loading: true
    });
    element.open();
    expect(element._isVisible).toBe(true);
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.handleCancel();
    expect(element._isVisible).toBe(false);
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it(`should dispatch "confirm.delete" when _handleOnDelete has been called"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-delete-confirm"
    );
    Object.assign(element, {
      disabled: true,
      deleteName: "主机",
      buttonConfig: {
        type: "danger",
        text: "删除主机"
      },
      fields: {
        name: "hostname",
        key: "instanceId",
        argsPath: "[1].instanceIds"
      },
      type: "array",
      keySeparator: ";"
    });
    element.updateData({
      detail: [
        { instanceId: "1", hostname: "host1" },
        { instanceId: "2", hostname: "host2" }
      ]
    });
    element.addEventListener("confirm.delete", mockEventListener);
    document.body.appendChild(element);
    await jest.runAllTimers();
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onDelete();
    expect(mockEventListener).toHaveBeenCalled();
  });

  it(`test updateData"`, async () => {
    const element = document.createElement(
      "presentational-bricks.brick-delete-confirm"
    );
    Object.assign(element, {
      disabled: true,
      deleteName: "主机",
      buttonConfig: {
        type: "danger",
        text: "删除主机"
      },
      fields: {
        name: "hostname",
        key: "instanceId",
        argsPath: "[1].instanceIds"
      },
      type: "array",
      keySeparator: ";"
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    element.updateData({
      detail: [
        { instanceId: "1", hostname: "host1" },
        { instanceId: "2", hostname: "host2" }
      ]
    });
    expect(element._deleteName).toEqual("host1,host2");
    element._fields.key = undefined;
    element._fields.name = undefined;
    element.updateData({
      detail: ["主机1", "主机2"]
    });
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onDelete();
    expect(element._deleteName).toEqual("主机1,主机2");
    element._type = "object";
    element._fields.key = "instanceId";
    element._fields.name = "hostname";
    element.updateData({
      detail: { hostname: "主机1", instanceId: "1" }
    });
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onDelete();
    expect(element._deleteName).toEqual("主机1");
    element._fields.argsPath = undefined;
    element._type = "string";
    element.updateData({
      detail: "主机2"
    });
    spyOnRender.mock.calls[spyOnRender.mock.calls.length - 1][0][
      "props"
    ].children.props.onDelete();
    expect(element._deleteName).toEqual("主机2");
    document.body.removeChild(element);
  });
});
