import { getBricksWithEvents } from "./getBricksWithEvents";
import { nodesForEventsView } from "../__fixtures__";

const mockConsoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => void 0);

describe("getBricksWithEvents", () => {
  it("should work", () => {
    expect(getBricksWithEvents(nodesForEventsView)).toEqual([
      {
        node: expect.objectContaining({ id: "B-002" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-003" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-004" }),
        hasEvents: true,
        isTargetOfEvents: false,
      },
      {
        node: expect.objectContaining({ id: "B-005" }),
        hasEvents: true,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-006" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-007" }),
        hasEvents: true,
        isTargetOfEvents: false,
      },
      {
        node: expect.objectContaining({ id: "B-008" }),
        hasEvents: true,
        isTargetOfEvents: false,
      },
      {
        node: expect.objectContaining({ id: "B-009" }),
        hasEvents: true,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-010" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
      {
        node: expect.objectContaining({ id: "B-011" }),
        hasEvents: false,
        isTargetOfEvents: true,
      },
    ]);
    expect(mockConsoleWarn).toBeCalledTimes(1);
    expect(mockConsoleWarn).toBeCalledWith("unknown lifeCycle: onOthers");
  });
});
