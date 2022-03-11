import "./";
import type { EventAgentElement } from "./";

describe("basic-bricks.event-agent", () => {
  it("should create a custom element", () => {
    const element = document.createElement(
      "basic-bricks.event-agent"
    ) as EventAgentElement;
    document.body.appendChild(element);
    const eventTrigger = jest.fn();
    element.addEventListener("event.trigger", eventTrigger);
    element.trigger({
      type: "custom",
    });
    expect(eventTrigger.mock.calls[0][0].detail).toEqual({
      type: "custom",
    });
    document.body.removeChild(element);
  });
});
