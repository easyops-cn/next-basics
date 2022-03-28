interface Overlay {
  node: HTMLElement;
}

const overlayPool: Overlay[] = [];
let overlayRemoved = false;

function getOverlay(index: number): Overlay {
  let overlay = overlayPool[index];
  if (!overlay) {
    overlay = {
      node: document.createElement("div"),
    };

    Object.assign(overlay.node.style, {
      position: "absolute",
      zIndex: "1000000",
      pointerEvents: "none",
      border: "1px dashed var(--palette-orange-6)",
      background: "rgba(120, 170, 210, 0.1)",
    });

    overlayPool.push(overlay);
  }
  return overlay;
}

export function showOverlay(elements: HTMLElement[]): void {
  dismissExistedOverlays();
  if (elements.length === 0) {
    return;
  }
  const nodes = elements.map((element, index) => {
    const overlay = getOverlay(index);
    const box = element.getBoundingClientRect();

    Object.assign(overlay.node.style, {
      width: `${box.width}px`,
      height: `${box.height}px`,
      top: `${box.top + window.scrollY}px`,
      left: `${box.left + window.scrollX}px`,
    });
    return overlay.node;
  });
  if (nodes.length === 1) {
    document.body.appendChild(nodes[0]);
  } else {
    const fragment = document.createDocumentFragment();
    fragment.append(...nodes);
    document.body.appendChild(fragment);
  }
  document.addEventListener("mouseenter", dismissExistedOverlays);
  overlayRemoved = false;
}

export function dismissExistedOverlays(): void {
  if (!overlayRemoved) {
    for (const overlay of overlayPool) {
      overlay.node.remove();
    }
    document.removeEventListener("mouseenter", dismissExistedOverlays);
    overlayRemoved = true;
  }
}
