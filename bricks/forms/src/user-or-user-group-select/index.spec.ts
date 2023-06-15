import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => null);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("forms.user-or-user-group-select", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("forms.user-or-user-group-select");
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should not create a custom element", async () => {
    const element = document.createElement(
      "forms.user-or-user-group-select"
    ) as any;
    element.notRender = true;
    spyOnRender.mockClear();
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();
    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should trigger event", async () => {
    const element = document.createElement(
      "forms.user-or-user-group-select"
    ) as any;
    await jest.runAllTimers();
    document.body.appendChild(element);

    const dispatchEvent = jest.spyOn(element, "dispatchEvent");

    element._handleChange({
      selectedUser: ["tester"],
      selectedUserGroup: ["test group"],
    });
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[0][0] as CustomEvent).detail).toEqual({
      selectedUser: ["tester"],
      selectedUserGroup: ["test group"],
    });

    element.mergeUseAndUserGroup = true;
    element._handleChange({
      selectedUser: ["easyops"],
      selectedUserGroup: ["test group"],
    });
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[1][0] as CustomEvent).detail).toEqual([
      "easyops",
      "test group",
    ]);

    element._handleChangeV2([
      { label: "tester", value: "tester" },
      { label: "test group", value: "test-group" },
    ]);
    await (global as any).flushPromises();
    expect((dispatchEvent.mock.calls[2][0] as CustomEvent).detail).toEqual([
      { label: "tester", value: "tester" },
      { label: "test group", value: "test-group" },
    ]);
  });
});
