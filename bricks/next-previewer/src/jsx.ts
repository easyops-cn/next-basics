import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { PreviewHelperElement, PreviewHelperElementProps } from "./preview-helper";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "next-previewer--preview-helper": DetailedHTMLProps<
        HTMLAttributes<PreviewHelperElement>,
        PreviewHelperElement
      > & PreviewHelperElementProps;
    }
  }
}
