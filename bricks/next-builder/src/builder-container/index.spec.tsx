import { mount, shallow } from "enzyme";
import ReactDOM from "react-dom";
import { EventDetailOfSnippetApply } from "@next-core/editor-bricks-helper";
import { BuilderContainer } from "./BuilderContainer";
import {
  BuilderClipboard,
  BuilderClipboardType,
  BuilderPasteDetailOfCopy,
  BuilderPasteDetailOfCut,
} from "./interfaces";
import {
  EventDownstreamType,
  EventStreamNode,
} from "./EventStreamCanvas/interfaces";
import { BuilderContainerElement } from "./";
import "./";

jest.mock("./BuilderContainer");

const spyOnRender = jest
  .spyOn(ReactDOM, "render")
  .mockImplementation(() => void 0);
const unmountComponentAtNode = jest
  .spyOn(ReactDOM, "unmountComponentAtNode")
  .mockImplementation(() => null);

describe("next-builder.builder-container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a custom element", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;
    // element.appId = "test-app";

    expect(spyOnRender).not.toBeCalled();
    document.body.appendChild(element);
    expect(spyOnRender).toBeCalled();

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    expect(wrapper.find(BuilderContainer).props()).toMatchObject({
      initialFullscreen: false,
      initialToolboxTab: null,
      initialEventStreamNodeId: null,
      initialClipboardType: null,
      initialClipboardSource: null,
    });

    document.body.removeChild(element);
    expect(unmountComponentAtNode).toBeCalled();
  });

  it("should init clipboard as copy", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;
    element.clipboardType = BuilderClipboardType.COPY;
    element.clipboardSource = "B-001";

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    expect(wrapper.find(BuilderContainer).props()).toMatchObject({
      initialClipboardType: "copy",
      initialClipboardSource: "B-001",
    });

    document.body.removeChild(element);
  });

  it("should init clipboard as cut", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;
    element.clipboardType = BuilderClipboardType.CUT;
    element.clipboardSource = "instance-a";

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    expect(wrapper.find(BuilderContainer).props()).toMatchObject({
      initialClipboardType: "cut",
      initialClipboardSource: "instance-a",
    });

    document.body.removeChild(element);
  });

  it("should handle clipboard change", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onClipboardChange = jest.fn();
    element.addEventListener("clipboard.change", onClipboardChange);

    // No events triggered if clipboard not changed.
    wrapper.find(BuilderContainer).invoke("onClipboardChange")(null);
    expect(onClipboardChange).not.toBeCalled();

    const clipboardOfCopy: BuilderClipboard = {
      type: BuilderClipboardType.COPY,
      sourceId: "B-001",
    };
    wrapper.find(BuilderContainer).invoke("onClipboardChange")(clipboardOfCopy);
    expect(onClipboardChange).toBeCalledWith(
      expect.objectContaining({
        detail: { clipboard: clipboardOfCopy },
      })
    );

    const clipboardOfCut: BuilderClipboard = {
      type: BuilderClipboardType.CUT,
      sourceInstanceId: "instance-a",
    };
    wrapper.find(BuilderContainer).invoke("onClipboardChange")(clipboardOfCut);
    expect(onClipboardChange).toBeCalledWith(
      expect.objectContaining({
        detail: { clipboard: clipboardOfCut },
      })
    );

    wrapper.find(BuilderContainer).invoke("onClipboardChange")(null);
    expect(onClipboardChange).toBeCalledWith(
      expect.objectContaining({
        detail: { clipboard: null },
      })
    );

    document.body.removeChild(element);
  });

  it("should handle copy and paste", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onNodeCopyPaste = jest.fn();
    element.addEventListener("node.copy.paste", onNodeCopyPaste);

    const detail: BuilderPasteDetailOfCopy = {
      sourceId: "B-001",
      targetId: "B-002",
    };
    wrapper.find(BuilderContainer).invoke("onNodeCopyPaste")(detail);
    expect(onNodeCopyPaste).toBeCalledWith(
      expect.objectContaining({
        detail,
      })
    );

    document.body.removeChild(element);
  });

  it("should handle cut and paste", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onNodeCutPaste = jest.fn();
    element.addEventListener("node.cut.paste", onNodeCutPaste);

    const detail: BuilderPasteDetailOfCut = {
      sourceInstanceId: "instance-a",
      targetInstanceId: "instance-b",
    };
    wrapper.find(BuilderContainer).invoke("onNodeCutPaste")(detail);
    expect(onNodeCutPaste).toBeCalledWith(
      expect.objectContaining({
        detail,
      })
    );

    document.body.removeChild(element);
  });

  it("should handle event node click", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onEventNodeClick = jest.fn();
    element.addEventListener("event.node.click", onEventNodeClick);

    const detail: EventStreamNode = {
      node: {
        type: "brick",
        brick: "brick-a",
        id: "id",
      },
      type: EventDownstreamType.EVENT,
      eventType: "click",
      children: [],
      handlers: [
        {
          target: "#modal",
          method: "open",
        },
      ],
    };
    wrapper.find(BuilderContainer).invoke("onEventNodeClick")({
      node: {
        type: "brick",
        brick: "brick-a",
        id: "id",
      },
      type: EventDownstreamType.EVENT,
      eventType: "click",
      children: [],
      handlers: [
        {
          target: "#modal",
          method: "open",
        },
      ],
    });
    expect(onEventNodeClick).toBeCalledWith(
      expect.objectContaining({
        detail,
      })
    );

    document.body.removeChild(element);
  });

  it("should handle canvas index switch", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onSwitchCanvasIndex = jest.fn();
    element.addEventListener("canvas.index.switch", onSwitchCanvasIndex);
    wrapper.find(BuilderContainer).invoke("onSwitchCanvasIndex")(1);
    expect(onSwitchCanvasIndex).toBeCalledWith(
      expect.objectContaining({
        detail: {
          canvasIndex: 1,
        },
      })
    );

    document.body.removeChild(element);
  });

  it("should handle storyboard query update", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;

    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onStoryboardQueryUpdate = jest.fn();
    element.addEventListener(
      "storyboard.query.update",
      onStoryboardQueryUpdate
    );
    wrapper.find(BuilderContainer).invoke("onStoryboardQueryUpdate")("any");
    expect(onStoryboardQueryUpdate).toBeCalledWith(
      expect.objectContaining({
        detail: {
          storyboardQuery: "any",
        },
      })
    );

    document.body.removeChild(element);
  });

  it("should handle snippet apply", () => {
    const element = document.createElement(
      "next-builder.builder-container"
    ) as BuilderContainerElement;
    element.appId = "test-app";
    document.body.appendChild(element);

    const wrapper = shallow(spyOnRender.mock.calls[0][0] as any);
    const onSnippetApply = jest.fn();
    element.addEventListener("snippet.apply", onSnippetApply);
    const event = new CustomEvent<EventDetailOfSnippetApply>(
      "internal.snippet.apply",
      {
        detail: {
          parentUid: 1,
          nodeUids: [2, 3],
          nodeIds: ["a", null],
          nodeDetails: [
            {
              parentUid: 1,
              nodeUid: 3,
              nodeAlias: "test-brick",
              nodeData: {
                type: "brick",
                parent: "a",
                brick: "my.test-brick",
                mountPoint: "any",
              },
              children: [
                {
                  parentUid: 3,
                  nodeUid: 4,
                  nodeAlias: "another-brick",
                  nodeData: {
                    type: "brick",
                    brick: "my.another-brick",
                    mountPoint: "another",
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      }
    );
    wrapper.find(BuilderContainer).invoke("onSnippetApply")(event);
    expect(onSnippetApply).toBeCalledWith(
      expect.objectContaining({
        detail: {
          parentUid: 1,
          nodeUids: [2, 3],
          nodeIds: ["a", null],
          nodeDetails: [
            {
              parentUid: 1,
              nodeUid: 3,
              nodeAlias: "test-brick",
              nodeData: {
                appId: "test-app",
                type: "brick",
                parent: "a",
                brick: "my.test-brick",
                mountPoint: "any",
              },
              children: [
                {
                  parentUid: 3,
                  nodeUid: 4,
                  nodeAlias: "another-brick",
                  nodeData: {
                    appId: "test-app",
                    type: "brick",
                    brick: "my.another-brick",
                    mountPoint: "another",
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      })
    );

    document.body.removeChild(element);
  });
});
