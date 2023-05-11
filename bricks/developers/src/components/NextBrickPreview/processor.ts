import { isEmpty } from "lodash";

export function getStorageKey(storyId: string): string {
  return `developer-brick-preview-${storyId}`;
}

export function calcMaxHeight(element: HTMLElement): number {
  const children = element.children;

  let maxHeight = (element.offsetHeight || 0) + (element.offsetTop || 0);

  if (children.length === 0) return maxHeight;

  for (const c of children) {
    const height = calcMaxHeight(c as HTMLElement);

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
          maxHeight = Math.max(calcMaxHeight(node as HTMLElement), maxHeight);
        }
      } else if (mutation.type === "attributes") {
        maxHeight = Math.max(
          calcMaxHeight(mutation.target as HTMLElement),
          maxHeight
        );
      }

      callback(maxHeight);
    }
  });
}
