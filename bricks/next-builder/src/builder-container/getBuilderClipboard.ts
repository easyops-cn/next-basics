import { BuilderClipboard, BuilderClipboardType } from "./interfaces";

export function getBuilderClipboard(
  clipboardType: BuilderClipboardType,
  clipboardSource: string
): BuilderClipboard {
  switch (clipboardType) {
    case BuilderClipboardType.COPY:
      return {
        type: BuilderClipboardType.COPY,
        sourceId: clipboardSource,
      };
    case BuilderClipboardType.CUT:
      return {
        type: BuilderClipboardType.CUT,
        sourceInstanceId: clipboardSource,
      };
    default:
      return null;
  }
}
