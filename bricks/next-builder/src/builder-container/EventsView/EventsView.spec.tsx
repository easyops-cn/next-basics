import React from "react";
import { shallow } from "enzyme";
import { getBricksWithEvents } from "./getBricksWithEvents";
import { EventsView } from "./EventsView";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderData: () => ({ nodes: [] as any[] }),
}));

jest.mock("./getBricksWithEvents");
jest.mock("./BrickWithEventsItem");

describe("EventsView", () => {
  it("should work", () => {
    (getBricksWithEvents as jest.Mock).mockReturnValueOnce([
      {
        node: {
          $$uid: 1,
        },
      },
      {
        node: {
          $$uid: 2,
        },
      },
    ]);
    const wrapper = shallow(<EventsView />);
    expect(wrapper.find("BrickWithEventsItem").length).toBe(2);
  });
});
