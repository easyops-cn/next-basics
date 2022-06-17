// istanbul ignore file: working in progress
// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react-devtools-shared/src/backend/views/Highlighter/index.js
import { throttle } from "lodash";
import type {
  PreviewMessagePreviewerHoverOnBrick,
  PreviewMessagePreviewerSelectBrick,
  PreviewMessagePreviewerContextMenuOnBrick,
  PreviewMessagePreviewerHoverOnMain,
  PreviewMessagePreviewerDrop,
} from "@next-types/preview";

let previewProxyOrigin: string;

export function setPreviewFromOrigin(origin: string): void {
  previewProxyOrigin = origin;
}

export function startInspecting(): void {
  registerListeners();
}

export function stopInspecting(): void {
  unregisterListeners();
}

function registerListeners(): void {
  window.addEventListener("click", onClick, true);
  window.addEventListener("mousedown", onMouseEvent, true);
  window.addEventListener("mouseover", onMouseEvent, true);
  window.addEventListener("mouseup", onMouseEvent, true);
  window.addEventListener("pointerdown", onPointerDown, true);
  window.addEventListener("pointerover", onPointerOver, true);
  window.addEventListener("pointerup", onMouseEvent, true);
  window.addEventListener("pointerleave", onPointerLeave, true);
  window.addEventListener("dragover", onDragOver, true);
  window.addEventListener("drop", onDrop, true);
  window.addEventListener("contextmenu", onContextMenu, true);
}

function unregisterListeners(): void {
  window.removeEventListener("click", onClick, true);
  window.removeEventListener("mousedown", onMouseEvent, true);
  window.removeEventListener("mouseover", onMouseEvent, true);
  window.removeEventListener("mouseup", onMouseEvent, true);
  window.removeEventListener("pointerdown", onPointerDown, true);
  window.removeEventListener("pointerover", onPointerOver, true);
  window.removeEventListener("pointerup", onMouseEvent, true);
  window.removeEventListener("pointerleave", onPointerLeave, true);
  window.removeEventListener("dragover", onDragOver, true);
  window.removeEventListener("drop", onDrop, true);
  window.removeEventListener("contextmenu", onContextMenu, true);
}

function onClick(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  selectBrick(event.target as HTMLElement);
}

function onMouseEvent(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
}

let isDragging = false;
const hoverOnBrick = throttle(
  (e: MouseEvent, isDirection?: boolean) => {
    const brick = e.target as HTMLElement;
    const iidList = getPossibleBrickIidList(brick);
    if (brick.tagName === "BODY") {
      window.parent.postMessage(
        {
          sender: "previewer",
          type: "hover-on-main",
          isDirection: isDirection ?? isDragging,
          position: {
            x: e.clientX,
            y: e.clientY,
          },
        } as PreviewMessagePreviewerHoverOnMain,
        previewProxyOrigin
      );
    } else if (iidList.length > 0) {
      window.parent.postMessage(
        {
          sender: "previewer",
          type: "hover-on-brick",
          iidList,
          isDirection: isDirection ?? isDragging,
          position: {
            x: e.clientX,
            y: e.clientY,
          },
        } as PreviewMessagePreviewerHoverOnBrick,
        previewProxyOrigin
      );
    }
  },
  100,
  { leading: false }
);

function onPointerDown(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  hoverOnBrick(event, false);
}

function onPointerOver(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  hoverOnBrick(event, false);
}

function onPointerLeave(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  window.parent.postMessage(
    {
      sender: "previewer",
      type: "hover-on-brick",
      iidList: [],
    } as PreviewMessagePreviewerHoverOnBrick,
    previewProxyOrigin
  );
}

function onDragOver(event: DragEvent): void {
  event.preventDefault();
  isDragging = true;
  hoverOnBrick(event);
}

function onDrop(event: DragEvent): void {
  event.preventDefault();
  // dragstart should setData: nodeData and it's work
  const nodeData = event.dataTransfer.getData("nodeData");
  isDragging = false;
  if (!nodeData) return;
  window.parent.postMessage(
    {
      sender: "previewer",
      type: "previewer-drop",
      nodeData: JSON.parse(nodeData),
    } as PreviewMessagePreviewerDrop,
    previewProxyOrigin
  );
}

function onContextMenu(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  contextMenuOnBrick(event.target as HTMLElement, {
    x: event.clientX,
    y: event.clientY,
  });
}

function contextMenuOnBrick(
  brick: HTMLElement,
  position: {
    x: number;
    y: number;
  }
): void {
  const iidList = getPossibleBrickIidList(brick);
  if (iidList.length > 0) {
    window.parent.postMessage(
      {
        sender: "previewer",
        type: "context-menu-on-brick",
        iidList,
        position,
      } as PreviewMessagePreviewerContextMenuOnBrick,
      previewProxyOrigin
    );
  }
}

function selectBrick(brick: HTMLElement): void {
  const iidList = getPossibleBrickIidList(brick);
  if (iidList.length > 0) {
    window.parent.postMessage(
      {
        sender: "previewer",
        type: "select-brick",
        iidList,
      } as PreviewMessagePreviewerSelectBrick,
      previewProxyOrigin
    );
  }
}

function getPossibleBrickIidList(brick: HTMLElement): string[] {
  const iidList: string[] = [];
  // Traverse from bottom to up, to find bricks current hover on.
  while (brick) {
    if (typeof brick.dataset.iid === "string") {
      iidList.push(brick.dataset.iid);
    }
    brick = brick.parentElement;
  }
  return iidList;
}
