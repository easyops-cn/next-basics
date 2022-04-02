import { useEffect } from "react";
import {
  useActiveNodeUid,
  useHoverNodeUid,
  type BuilderDataManager,
} from "@next-core/editor-bricks-helper";
import type {
  PreviewMessageBuilderHoverOnBrick,
  PreviewMessageBuilderInitRootTpl,
  PreviewMessageBuilderSelectBrick,
} from "@next-types/preview";

export function useHighlightBrick(
  type: "active" | "hover",
  manager: BuilderDataManager
): void {
  const hoverNodeUid = useHoverNodeUid();
  const activeNodeUid = useActiveNodeUid();
  const highlightNodeUid = type === "active" ? activeNodeUid : hoverNodeUid;

  useEffect(() => {
    sendHighlightBrick(type, highlightNodeUid, manager);
  }, [highlightNodeUid, manager, type]);
}

export function sendHighlightBrick(
  type: "active" | "hover",
  highlightNodeUid: number,
  manager: BuilderDataManager
): void {
  let iid: string;
  let alias: string;
  if (highlightNodeUid) {
    const highlightNode = manager
      .getData()
      .nodes.find((node) => node.$$uid === highlightNodeUid);
    if (
      highlightNode &&
      (highlightNode.type === "brick" ||
        highlightNode.type === "custom-template")
    ) {
      iid = highlightNode.instanceId;
      alias = highlightNode.alias;
    }
  }
  window.postMessage({
    sender: "builder",
    type: type === "active" ? "select-brick" : "hover-on-brick",
    iid,
    alias,
  } as PreviewMessageBuilderHoverOnBrick | PreviewMessageBuilderSelectBrick);
}

export function sendInitRootTpl(manager: BuilderDataManager): void {
  const { rootId, nodes } = manager.getData();
  const root = nodes.find((node) => node.$$uid === rootId);
  const rootTpl = root?.type === "custom-template" ? root.templateId : null;
  window.postMessage({
    sender: "builder",
    type: "init-root-tpl",
    rootTpl,
  } as PreviewMessageBuilderInitRootTpl);
}
