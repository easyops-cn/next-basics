import React from "react";
import { shallow } from "enzyme";
import { useBuilderData } from "@next-core/editor-bricks-helper";
import { EventStreamCanvas } from "./EventStreamCanvas";
import { EventStreamGraphComponent } from "./EventStreamGraphComponent";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderData: jest.fn(),
}));

const mockUseBuilderData = useBuilderData as jest.MockedFunction<
  typeof useBuilderData
>;

describe("EventStreamCanvas", () => {
  it("should work", () => {
    mockUseBuilderData.mockReturnValueOnce({
      rootId: 1,
      nodes: [
        {
          $$uid: 1,
          id: "R-001",
          type: "bricks",
          path: "/",
        },
        {
          $$uid: 2,
          id: "B-002",
          type: "brick",
          brick: "my-brick",
        },
      ],
      edges: [],
    });
    const wrapper = shallow(<EventStreamCanvas nodeId={"B-002"} />);
    expect(wrapper.find(EventStreamGraphComponent).prop("node")).toMatchObject({
      id: "B-002",
    });
  });

  it("should render nothing if node not found", () => {
    mockUseBuilderData.mockReturnValueOnce({
      rootId: 1,
      nodes: [],
      edges: [],
    });
    const wrapper = shallow(<EventStreamCanvas nodeId={"B-002"} />);
    expect(wrapper.html()).toBe(null);
  });
});
