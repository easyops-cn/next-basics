import React from "react";
import { mount } from "enzyme";
import { useBuilderData } from "@next-core/editor-bricks-helper";
import { EventStreamGraphComponent } from "./EventStreamGraphComponent";
import { useBuilderUIContext } from "../BuilderUIContext";
import {
  // @ts-ignore mocking
  mockGetDOMNode,
  // @ts-ignore mocking
  mockRender,
} from "./EventStreamGraph";
import { nodesForEventsView } from "../__fixtures__";
import { BuilderDataType } from "../interfaces";

jest.mock("./EventStreamGraph");
jest.mock("../BuilderUIContext");

const mockConsoleWarn = jest
  .spyOn(console, "warn")
  .mockImplementation(() => void 0);

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderData: jest.fn(),
}));

(useBuilderData as jest.MockedFunction<typeof useBuilderData>).mockReturnValue({
  rootId: 1,
  nodes: nodesForEventsView,
  edges: [],
});

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

describe("EventStreamGraphComponent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work for upstream tree with target map", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      dataType: BuilderDataType.ROUTE_OF_BRICKS,
    });

    const div = document.createElement("div");
    mockGetDOMNode.mockReturnValueOnce(div);
    const wrapper = mount(
      <EventStreamGraphComponent node={nodesForEventsView[1]} />
    );

    expect(mockRender).toBeCalledWith(
      expect.objectContaining({
        type: "root",
        node: expect.objectContaining({
          id: "B-002",
        }),
        children: [],
      }),
      expect.objectContaining({
        type: "upstream-root",
        node: expect.objectContaining({
          id: "B-002",
        }),
        children: [
          expect.objectContaining({
            type: "upstream-event",
            eventType: "click",
            handler: {
              method: "open",
              target: "my\\.brick-b",
            },
            node: expect.objectContaining({
              id: "B-004",
            }),
            children: [
              expect.objectContaining({
                type: "upstream-source",
                node: expect.objectContaining({
                  id: "B-004",
                }),
                children: [],
              }),
            ],
          }),
        ],
      }),
      {
        targetMap: new Map(
          Object.entries({
            "my\\.brick-a": "B-001",
            "my\\.brick-b": "B-002",
            "my\\.brick-c": "B-003",
            "#myBrickC": "B-003",
            "my\\.brick-d": "B-004",
            "my\\.brick-e": "B-005",
            "my\\.brick-f": "B-006",
            "my\\.brick-g": "B-007",
            "my\\.brick-h": "B-008",
            "my\\.brick-i": "B-009",
            "#myBrickI": "B-009",
            "my\\.brick-j": "B-010",
            "#myBrickJ": "B-010",
            "my\\.brick-k": "B-011",
            "#myBrickK": "B-011",
          })
        ),
        targetRefMap: new Map(),
      }
    );

    expect(mockConsoleWarn).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it("should work for downstream tree with targetRef Map", () => {
    mockUseBuilderUIContext.mockReturnValueOnce({
      dataType: BuilderDataType.CUSTOM_TEMPLATE,
      fullscreen: true,
    });
    const div = document.createElement("div");
    mockGetDOMNode.mockReturnValueOnce(div);
    const wrapper = mount(
      <EventStreamGraphComponent node={nodesForEventsView[6]} />
    );

    expect(mockRender).toBeCalledWith(
      expect.objectContaining({
        type: "root",
        node: expect.objectContaining({
          id: "B-007",
        }),
        children: [
          expect.objectContaining({
            type: "event",
            eventType: "click",
            node: expect.objectContaining({
              id: "B-007",
            }),
            children: [],
          }),
        ],
      }),
      expect.objectContaining({
        type: "upstream-root",
        node: expect.objectContaining({
          id: "B-007",
        }),
        children: [],
      }),
      {
        targetMap: expect.any(Map),
        targetRefMap: new Map(
          Object.entries({
            refBrickF: "B-006",
          })
        ),
      }
    );

    wrapper.unmount();
  });
});
