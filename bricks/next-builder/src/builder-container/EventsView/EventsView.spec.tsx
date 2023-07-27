import React from "react";
import { shallow } from "enzyme";
import { getBricksWithEvents } from "./getBricksWithEvents";
import { EventsView } from "./EventsView";
import { BrickWithEventsItem } from "./BrickWithEventsItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import {
  useBuilderData,
  useBuilderDataManager,
  useHoverNodeUid,
} from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper");

const mockGetHoverNodeUid = jest.fn().mockReturnValue(1);
const mockSetHoverNodeUid = jest.fn();
(useBuilderData as jest.Mock).mockReturnValue({ nodes: [] as any[] });
(useHoverNodeUid as jest.Mock).mockReturnValue(1);
(useBuilderDataManager as jest.Mock).mockReturnValue({
  getHoverNodeUid: mockGetHoverNodeUid,
  setHoverNodeUid: mockSetHoverNodeUid,
});

jest.mock("./getBricksWithEvents");
jest.mock("./BrickWithEventsItem");

(getBricksWithEvents as jest.Mock).mockReturnValue([
  {
    node: {
      $$uid: 1,
      alias: "my-alias-brick",
    },
  },
  {
    node: {
      $$uid: 2,
      brick: "my.another-brick",
    },
  },
  {
    node: {
      $$uid: 3,
      alias: "someone-else-alias-brick",
    },
  },
  {
    node: {
      $$uid: 4,
      brick: "someone-else.another-brick",
    },
  },
]);

describe("EventsView", () => {
  it("should work", () => {
    const wrapper = shallow(<EventsView />);
    expect(wrapper.find(BrickWithEventsItem).length).toBe(4);
    wrapper.find(SearchComponent).invoke("onSearch")("my");
    expect(wrapper.find(BrickWithEventsItem).length).toBe(2);
    expect(wrapper.find(BrickWithEventsItem).at(0).prop("node").$$uid).toBe(1);
    expect(wrapper.find(BrickWithEventsItem).at(1).prop("node").$$uid).toBe(2);
    wrapper
      .find("li[data-testid='brick-with-events-item-2']")
      .invoke("onMouseEnter")({} as any);
    expect(mockGetHoverNodeUid).toBeCalled();
    expect(mockSetHoverNodeUid).toBeCalled();
    mockSetHoverNodeUid.mockClear();
    wrapper
      .find("li[data-testid='brick-with-events-item-1']")
      .invoke("onMouseEnter")({} as any);
    expect(mockSetHoverNodeUid).not.toBeCalled();
    wrapper
      .find("li[data-testid='brick-with-events-item-1']")
      .invoke("onMouseLeave")({} as any);
    expect(mockSetHoverNodeUid).toBeCalled();
    mockSetHoverNodeUid.mockClear();
    wrapper
      .find("li[data-testid='brick-with-events-item-2']")
      .invoke("onMouseLeave")({} as any);
    expect(mockSetHoverNodeUid).not.toBeCalled();
  });
});
