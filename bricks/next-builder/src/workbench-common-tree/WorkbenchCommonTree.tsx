import React, { useState, useEffect } from "react";
import {
  WorkbenchTree,
  WorkbenchTreeProps,
} from "../shared/workbench/WorkbenchTree";
import {
  dragStatusEnum,
  WorkbenchTreeDndContext,
} from "../shared/workbench/WorkbenchTreeDndContext";
import { WorkbenchNodeData } from "../shared/workbench/interfaces";

interface WorkBenchCommonTreeProps extends WorkbenchTreeProps {
  nodeKey?: string;
  allowDrag: boolean;
  handleNodeDrop: (detail: unknown) => void;
}

export function WorkbenchCommonTree({
  nodes,
  placeholder,
  searchPlaceholder,
  noSearch,
  allowDrag,
  nodeKey,
  handleNodeDrop,
}: WorkBenchCommonTreeProps): React.ReactElement {
  const [curNode, setCurNode] = useState<WorkbenchNodeData>();
  const [curElement, setCurElement] = useState<HTMLElement>();
  const [overNode, setOverNode] = useState<WorkbenchNodeData>();
  const [overElement, setOverElement] = useState<HTMLElement>();
  const [overStatus, setOverStatus] = useState<dragStatusEnum>();

  const findDragParent = (element: HTMLElement, equal = true): HTMLElement => {
    let node = element;
    while (node) {
      if (
        node.draggable &&
        (equal || node !== element) &&
        node.tagName !== "A"
      ) {
        return node;
      }
      node = node.parentElement;
    }
  };

  const getDragState = (
    e: React.DragEvent<HTMLElement>
  ): {
    element: HTMLElement;
    node: WorkbenchNodeData;
    status: dragStatusEnum;
  } => {
    const element = findDragParent(e.target as HTMLElement);
    if (element === curElement) {
      return;
    }
    const { top, bottom } = element.getBoundingClientRect();
    const id = element.dataset.uid;
    let status: dragStatusEnum;
    if (e.clientY < top + 10) {
      status = dragStatusEnum.top;
    } else if (e.clientY > bottom - 10) {
      status = dragStatusEnum.bottom;
    }

    return {
      element,
      node: nodes.find(
        (item) => (item.data as Record<string, unknown>)[nodeKey] === id
      ),
      status,
    };
  };

  const handleOnDragStart = (
    e: React.DragEvent,
    node: WorkbenchNodeData
  ): void => {
    if (!allowDrag) return;
    setCurElement(e.target as HTMLElement);
    setCurNode(node);
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!allowDrag) return;
    if ((e.target as HTMLElement).className === "workbenchTree-placeholder-dom")
      return;
    const dom = getDragState(e);
    if (dom && !curElement?.contains(dom.element)) {
      setOverElement(dom.element);
      setOverNode(dom.node);
      setOverStatus(dom.status);
    }
  };

  const handleOnDragEnd = (): void => {
    setCurElement(null);
    setOverElement(null);
    setOverNode(null);
    setOverStatus(null);
  };
  const handleOnDrop = (): void => {
    if (!allowDrag) return;
    nodes.splice(
      nodes.findIndex((item) => item.name === curNode.name),
      1
    );
    nodes.splice(
      nodes.findIndex((item) => item.key === overNode.key) +
        (overStatus === "top" ? 0 : 1),
      0,
      curNode
    );
    handleNodeDrop({
      nodes,
      curNode,
      overNode,
      status: overStatus,
    });
    handleOnDragEnd();
  };

  useEffect(() => {
    window.addEventListener("dragend", handleOnDragEnd);
    return () => {
      window.removeEventListener("dragend", handleOnDragEnd);
    };
  }, []);

  return (
    <WorkbenchTreeDndContext.Provider
      value={{
        allow: allowDrag,
        allowMoveToRoot: true,
        dragNode: curElement,
        dragOverNode: overElement,
        dragStatus: overStatus,
        onDragStart: handleOnDragStart,
        onDragOver: handleOnDragOver,
        onDrop: handleOnDrop,
      }}
    >
      <WorkbenchTree
        nodes={nodes}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        noSearch={noSearch}
      />
    </WorkbenchTreeDndContext.Provider>
  );
}
