import { isEmpty } from "lodash";

export function getStorageKey(storyId: string): string {
  return `developer-brick-preview-${storyId}`;
}

function isElement(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}

export function calcMaxHeight(element: Node): number {
  if (!isElement(element)) {
    return 0;
  }
  const children = element.children;

  let maxHeight =
    ((element as HTMLElement).offsetHeight || 0) +
    ((element as HTMLElement).offsetTop || 0);

  if (children.length === 0) return maxHeight;

  for (const c of children) {
    const height = calcMaxHeight(c);

    maxHeight = Math.max(maxHeight, height);
  }

  return maxHeight;
}

export function getMutationObserver(
  callback: (height: number) => void
): MutationObserver {
  return new MutationObserver((mutationsList) => {
    let maxHeight = 0;
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && !isEmpty(mutation.addedNodes)) {
        for (const node of mutation.addedNodes) {
          maxHeight = Math.max(calcMaxHeight(node), maxHeight);
        }
      } else if (mutation.type === "attributes") {
        maxHeight = Math.max(calcMaxHeight(mutation.target), maxHeight);
      }

      callback(maxHeight);
    }
  });
}
