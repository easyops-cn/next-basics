interface Overlay {
  node: HTMLElement;
  border: HTMLElement;
  padding: HTMLElement;
  content: HTMLElement;
}

const overlayPool: Overlay[] = [];
let overlayRemoved = false;

function getOverlay(index: number): Overlay {
  let overlay = overlayPool[index];
  if (!overlay) {
    overlay = {
      node: document.createElement("div"),
      border: document.createElement("div"),
      padding: document.createElement("div"),
      content: document.createElement("div"),
    };

    Object.assign(overlay.node.style, {
      position: "absolute",
      zIndex: "1000000",
      pointerEvents: "none",
      borderColor: "rgba(255, 155, 0, 0.3)",
    });

    overlay.border.style.borderColor = "rgba(255, 200, 50, 0.3)";
    overlay.padding.style.borderColor = "rgba(77, 200, 0, 0.3)";
    overlay.content.style.backgroundColor = "rgba(120, 170, 210, 0.7)";

    overlay.node.appendChild(overlay.border);
    overlay.border.appendChild(overlay.padding);
    overlay.padding.appendChild(overlay.content);

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
    const dims = getElementDimensions(element);

    boxWrap(overlay.node, dims, "margin");
    boxWrap(overlay.border, dims, "border");
    boxWrap(overlay.padding, dims, "padding");

    Object.assign(overlay.content.style, {
      width: `${
        box.width -
        dims.borderLeft -
        dims.borderRight -
        dims.paddingLeft -
        dims.paddingRight
      }px`,
      height: `${
        box.height -
        dims.borderTop -
        dims.borderBottom -
        dims.paddingTop -
        dims.paddingBottom
      }px`,
    });

    Object.assign(overlay.node.style, {
      top: `${box.top - dims.marginTop + window.scrollY}px`,
      left: `${box.left - dims.marginLeft + window.scrollX}px`,
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

function getElementDimensions(domElement: HTMLElement): Record<string, number> {
  const calculatedStyle = window.getComputedStyle(domElement);
  return {
    borderLeft: parseInt(calculatedStyle.borderLeftWidth, 10),
    borderRight: parseInt(calculatedStyle.borderRightWidth, 10),
    borderTop: parseInt(calculatedStyle.borderTopWidth, 10),
    borderBottom: parseInt(calculatedStyle.borderBottomWidth, 10),
    marginLeft: parseInt(calculatedStyle.marginLeft, 10),
    marginRight: parseInt(calculatedStyle.marginRight, 10),
    marginTop: parseInt(calculatedStyle.marginTop, 10),
    marginBottom: parseInt(calculatedStyle.marginBottom, 10),
    paddingLeft: parseInt(calculatedStyle.paddingLeft, 10),
    paddingRight: parseInt(calculatedStyle.paddingRight, 10),
    paddingTop: parseInt(calculatedStyle.paddingTop, 10),
    paddingBottom: parseInt(calculatedStyle.paddingBottom, 10),
  };
}

function boxWrap(
  element: HTMLElement,
  dims: Record<string, number>,
  what: string
): void {
  Object.assign(element.style, {
    borderTopWidth: dims[what + "Top"] + "px",
    borderLeftWidth: dims[what + "Left"] + "px",
    borderRightWidth: dims[what + "Right"] + "px",
    borderBottomWidth: dims[what + "Bottom"] + "px",
    borderStyle: "solid",
  });
}
