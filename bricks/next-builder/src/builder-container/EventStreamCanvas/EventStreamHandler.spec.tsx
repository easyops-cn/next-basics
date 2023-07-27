import React from "react";
import { shallow } from "enzyme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrickEventHandler } from "@next-core/brick-types";
import { EventStreamHandler } from "./EventStreamHandler";
import {
  EventDownstreamType,
  EventStreamNode,
  EventUpstreamType,
} from "./interfaces";

describe("EventStreamHandler", () => {
  it.each<
    [
      string,
      {
        eventNode: Partial<EventStreamNode>;
        handler: BrickEventHandler;
        isLast?: boolean;
      },
      {
        icon: string;
        title: string;
        content: string;
        handlerClassName: string;
        targetIsAvailable?: boolean;
        isTargetOfSelf?: boolean;
        usingTargetRef?: boolean;
        eventStreamNodeId?: string;
      }
    ]
  >([
    [
      "builtin handler",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: { action: "console.log" },
      },
      {
        icon: "code",
        title: "action:",
        content: "console.log",
        handlerClassName: "handlerTypeOfBuiltin",
      },
    ],
    [
      "useProvider handler",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: { useProvider: "my-provider" },
      },
      {
        icon: "database",
        title: "useProvider:",
        content: "my-provider",
        handlerClassName: "handlerTypeOfUseProvider",
      },
    ],
    [
      "method handler",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: { target: "my-brick", method: "open" },
      },
      {
        icon: "wrench",
        title: "open(…)",
        content: "my-brick",
        handlerClassName: "handlerTypeOfExecute",
        targetIsAvailable: true,
        eventStreamNodeId: "B-001",
      },
    ],
    [
      "properties handler",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: {
          target: "_self",
          properties: {
            quality: "good",
          },
        },
      },
      {
        icon: "pen-square",
        title: "set properties:",
        content: "_self",
        handlerClassName: "handlerTypeOfSetProps",
        isTargetOfSelf: true,
      },
    ],
    [
      "method handler by targetRef",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: {
          targetRef: "myBrickRef",
          method: "open",
        },
        isLast: true,
      },
      {
        icon: "wrench",
        title: "open(…)",
        content: "@myBrickRef",
        handlerClassName: "handlerTypeOfExecute",
        targetIsAvailable: true,
        usingTargetRef: true,
        eventStreamNodeId: "B-002",
      },
    ],
    [
      "method handler of upstream",
      {
        eventNode: {
          type: EventUpstreamType.UPSTREAM_EVENT,
        },
        handler: { target: "my-brick", method: "open" },
      },
      {
        icon: "wrench",
        title: "open(…)",
        content: "my-brick",
        handlerClassName: "handlerTypeOfExecute",
      },
    ],
    [
      "properties handler by targetRef",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: {
          targetRef: "myBrickRefNotFound",
          properties: {
            quality: "good",
          },
        },
      },
      {
        icon: "pen-square",
        title: "set properties:",
        content: "@myBrickRefNotFound",
        handlerClassName: "handlerTypeOfSetProps",
        usingTargetRef: true,
      },
    ],
    [
      "unknown handler",
      {
        eventNode: {
          type: EventDownstreamType.EVENT,
        },
        handler: ({
          target: "my-brick",
        } as unknown) as BrickEventHandler,
      },
      {
        icon: "question-circle",
        title: "unknown:",
        content: '{"target":"my-brick"}',
        handlerClassName: "handlerTypeOfUnknown",
      },
    ],
  ])(
    "should work for %j",
    (description, { eventNode, ...restProps }, result) => {
      const setEventStreamNodeId = jest.fn();
      const wrapper = shallow(
        <EventStreamHandler
          eventNode={eventNode as EventStreamNode}
          targetMap={
            new Map(
              Object.entries({
                "my-brick": "B-001",
              })
            )
          }
          targetRefMap={
            new Map(
              Object.entries({
                myBrickRef: "B-002",
              })
            )
          }
          setEventStreamNodeId={setEventStreamNodeId}
          {...restProps}
        />
      );
      expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(result.icon);
      expect(wrapper.find(".handler").hasClass("targetIsAvailable")).toBe(
        !!result.targetIsAvailable
      );
      expect(wrapper.find(".handler").hasClass("isTargetOfSelf")).toBe(
        !!result.isTargetOfSelf
      );
      expect(wrapper.find(".handler").hasClass(result.handlerClassName)).toBe(
        true
      );
      expect(wrapper.find(".handlerTitle").text()).toBe(result.title);
      expect(wrapper.find(".handlerContent").text()).toBe(result.content);
      expect(wrapper.find(".usingTargetRef").length > 0).toBe(
        !!result.usingTargetRef
      );
      wrapper.find(".handler").invoke("onClick")(null);
      if (result.eventStreamNodeId) {
        expect(setEventStreamNodeId).toBeCalledWith(result.eventStreamNodeId);
      } else {
        expect(setEventStreamNodeId).not.toBeCalled();
      }
    }
  );
});
