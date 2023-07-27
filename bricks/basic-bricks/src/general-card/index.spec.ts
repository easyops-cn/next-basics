import ReactDOM from "react-dom";
import "./";

const spyOnRender = jest.spyOn(ReactDOM, "render").mockImplementation(() => {});
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation((() => {}) as any);

describe("basic-bricks.general-card", () => {
  it("should create a custom element", async () => {
    const element = document.createElement("basic-bricks.general-card") as any;
    // Always waiting for async `(dis)connectedCallback`
    await jest.runAllTimers();
    expect(spyOnRender).not.toBeCalled();
    Object.assign(element, {
      configProps: {
        title: "Title"
      }
    });
    document.body.appendChild(element);
    await jest.runAllTimers();
    expect(spyOnRender).toBeCalled();

    // ridiculous
    element.idEventNameMap = new Map();
    element.eventDetailMap = new Map();
    element.operationButtons = [
      {
        id: "id-1",
        eventName: "event-name-1",
        configProps: {}
      },
      {
        id: "id-2",
        eventName: "event-name-2",
        configProps: {},
        needData: true
      }
    ];
    element.emitEvent("event-name-1");
    element.dealCustomEvent(
      new CustomEvent("event-name-2", { detail: "hello" })
    );
    element.emitEvent("event-name-2");

    document.body.removeChild(element);
    await jest.runAllTimers();
    expect(unmountComponentAtNode).toBeCalled();
  });
});
