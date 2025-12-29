import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { BroadcastChannelElement, BroadcastChannelElementProps } from "./broadcast-channel";
import type { GeneralClipboardElement, GeneralClipboardElementProps } from "./general-clipboard";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "utils--broadcast-channel": DetailedHTMLProps<
        HTMLAttributes<BroadcastChannelElement>,
        BroadcastChannelElement
      > & Partial<BroadcastChannelElementProps> & {
        onChannelMessage?: (event: CustomEvent<unknown>) => void;
      };
      "utils--general-clipboard": DetailedHTMLProps<
        HTMLAttributes<GeneralClipboardElement>,
        GeneralClipboardElement
      > & Partial<GeneralClipboardElementProps> & {
        onClipboardChange?: (event: CustomEvent<{ clipboard: unknown }>) => void;
      };
    }
  }
}
