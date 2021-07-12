import { BuilderClipboard, BuilderClipboardType } from "./interfaces";

export function getBuilderClipboard(
  clipboardType: BuilderClipboardType,
  clipboardSource: string,
  nodeType: string
): BuilderClipboard {
  switch (clipboardType) {
    case BuilderClipboardType.COPY:
      return {
        type: BuilderClipboardType.COPY,
        sourceId: clipboardSource,
        nodeType,
      };
    case BuilderClipboardType.CUT:
      return {
        type: BuilderClipboardType.CUT,
        sourceInstanceId: clipboardSource,
        nodeType,
      };
    default:
      return null;
  }
}
